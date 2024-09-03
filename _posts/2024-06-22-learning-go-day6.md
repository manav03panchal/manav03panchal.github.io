---
layout: post
title:  "Learning Go, Day 6 and 7"
categories: learning go
---

Hello gang. I'm back with another day of learning Go. I'm continuing with the book. We're at 1.7 now. I ignore the import segment for brevity.

We look at making a minimal web server. Which was very easy because the library functions handle most of the work.

`25th June, 2024`
\
This is our answer for Exercise 1.12:

```go
// handler echoes the HTTP request. Building up on server3.go provided in the book.
var mu sync.Mutex
var count int
var cycles int = 5

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/count", counter)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		fmt.Printf("r.ParseForm(): %v\n", err)
	}

	if _cycles, ok := r.Form["cycles"]; ok {
		cycles, _ = strconv.Atoi(_cycles[0])
	}
	fmt.Printf("Num of cycles is: %d", cycles)
	lissajous(w, cycles)
}

func counter(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	fmt.Fprintf(w, "Count %d\n", count)
	mu.Unlock()
}

var palette = []color.Color{color.White, color.Black}

const (
	whiteIndex = 0
	blackIndex = 1
)

func lissajous(out io.Writer, cycles int) {
	const (
		res     = 0.001 // angular resolution
		size    = 100   // image canvas covers [-size..+size]
		nframes = 64    // number of animation frames
		delay   = 8     // delay between frames in 10ms units
	)
	freq := rand.Float64() * 3.0 // relative frequency of y oscillator
	anim := gif.GIF{LoopCount: nframes}
	phase := 0.0 // phase difference
	for i := 0; i < nframes; i++ {
		rect := image.Rect(0, 0, 2*size+1, 2*size+1)
		img := image.NewPaletted(rect, palette)
		for t := 0.0; t < float64(cycles)*2*math.Pi; t += res {
			x := math.Sin(t)
			y := math.Sin(t*freq + phase)
			img.SetColorIndex(size+int(x*size+0.5), size+int(y*size+0.5),
				blackIndex)
		}
		phase += 0.1
		anim.Delay = append(anim.Delay, delay)
		anim.Image = append(anim.Image, img)
	}
	gif.EncodeAll(out, &anim) // NOTE: ignoring encoding errors
}
```
