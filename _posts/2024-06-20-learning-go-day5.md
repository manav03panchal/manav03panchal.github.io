---
layout: post
title:  "Learning Go, Day 5"
categories: learning go
---

Continuing with the book. We're at 1.6 now. I ignore the import segment for brevity.

This is where we encounter a `goroutine` and a `channel`.

From the book: A goroutine is a concurrent function execution. Channels are a way for goroutines to communicate with each other.

If you come from a more C/C++ background, you can think of a goroutine as a thread and a channel as a pipe.

For exercise 1.10 we can observe caching. Here's a screenshot of the output:

___
\
![Exercise 1.10](/_media/output.png)

___
\
And now we modify fetchall to print its output to a file. Here's the solution (I mean we could use terminal to just direct the output to some file.) But here's the solution anyway:

```go
func main() {
	file, err := os.Create("output.txt")
	if err != nil {
		fmt.Println("failed to create file")
		fmt.Println(err)
		return
	}
	defer file.Close()
	// time for the main program
	start := time.Now()
	// main channel?
	ch := make(chan string)
	// then run the goroutine with arguments (the URLs) provided during invoke.
	for _, url := range os.Args[1:] {
		go fetch(url, ch) // this is a goroutine.
	}
	// here, ch is filled with stuff from the above goroutine
	// then we print them.
	for range os.Args[1:] {
		_, err = file.WriteString(<-ch + "\n") // print the thing received from chan ch
		if err != nil {
			fmt.Println(err)
			return
		}
	}
	// print total time elapsed since main prog invoked.
	fmt.Printf("%fs", time.Since(start).Seconds())
	fmt.Println(" elapsed.")
}

// goroutine to run http.Get() on the URL we provide to it.
func fetch(url string, ch chan<- string) {
	// now each grtn has a timer that we print.
	start := time.Now()
	resp, err := http.Get(url)
	// checking if there's an error here or not.
	if err != nil {
		ch <- fmt.Sprint(err)
		return
	}
	nbytes, err := io.Copy(io.Discard, resp.Body)
	resp.Body.Close() // we do this to not leak resources ??

	if err != nil {
		ch <- fmt.Sprintf("while reading %s: %v", url, err)
		return
	}
	secs := time.Since(start).Seconds()
	ch <- fmt.Sprintf("%.2fs %7d %s", secs, nbytes, url)
}
```

We used os.Create() to create the file.
I like the `defer file.Close()` line. It's like a destructor in C++.
What is does is wait for the surrounding function to return and then it closes the file.

I think we can end this here for this topic.

I'll see you tomorrow. Bye.
