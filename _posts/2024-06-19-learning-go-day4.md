---
layout: post
title:  "Learning Go, Day 4"
categories: learning go
---

Hello gang. We're continuing with the book. We're at 1.5 now. I ignore the import segment for brevity.

Here's the solution for Exercise 1.7:

```go
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	for _, url := range os.Args[1:] {
		resp, err := http.Get(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
			os.Exit(1)
		}
		_, err = io.Copy(os.Stdout, resp.Body)
		resp.Body.Close()
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: copying %s: %v\n", url, err)
			os.Exit(1)
		}
	}
}
```


Here's the solution for Exercise 1.8:

```go
func main() {
	for _, url := range os.Args[1:] {
		// modify fetch to add the prefix http:// to each argument URL if it is missing.

		// check if the url has http:// prefix
		if strings.HasPrefix(url, "http://") == true {
			fmt.Println("URL has http:// prefix: ")
		}

		if strings.HasPrefix(url, "http://") == false {
			fmt.Println("URL does not have http:// prefix: ")
			url = "http://" + url
		}

		resp, err := http.Get(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
			os.Exit(1)
		}
		// b, err := io.ReadAll(resp.Body)
		// need to use io.Copy(src, dest) instead now.
		_, err = io.Copy(os.Stdout, resp.Body)
		resp.Body.Close()
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: reading %s: %v\n", url, err)
			os.Exit(1)
		}
	}
}
```


This is the solution for Exercise 1.9:

```go
func main() {
	for _, url := range os.Args[1:] {
		// modify fetch to add the prefix http:// to each argument URL if it is missing.
		if strings.HasPrefix(url, "http://") == false {
			url = "http://" + url
		}

		resp, err := http.Get(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
			os.Exit(1)
		}
		// b, err := io.ReadAll(resp.Body)
		// need to use io.Copy(src, dest) instead now.

		// also print the HTTP status code.
		fmt.Println(resp.Status)
		_, err = io.Copy(os.Stdout, resp.Body)
		resp.Body.Close()
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: reading %s: %v\n", url, err)
			os.Exit(1)
		}
	}
}

```


___
\
Stuff was pretty straightforward. Alright. Good night.

Manav.
