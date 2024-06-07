---
layout: post
title:  "Learning Go, Day 3"
categories: learning go
---

One thing to add before we proceed, While doing the exercises in the book (1.3), I found out that `ioutil.Discard` has been deprecated, and now it is just `io.Discard`

Also, here's a question I had when solving [What happens if I don't close `resp.Body?`](https://stackoverflow.com/questions/33238518/what-could-happen-if-i-dont-close-response-body)

READ THE BOOK DAWG.

---
\
Let's start with Chapter 1.3

## Finding Duplicate Lines

This is a table to refer to for proper formatting (Standard C stuff tbh):

![Table for Formatting](/_media/table02.jpg)
---
I'm not going to share the code here. It's a simple program that reads from `stdin` and prints out the lines that are repeated. I'm going to share the code for the next exercise, which is a bit more interesting.

## GIFs

Go has a standard image package.
We got to make Lissajous figures. Code will be posted in the repo.

## Fetching URLs Concurrently

`ioutil.ReadAll` is now deprecated. Use `io.ReadAll` instead.

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
		b, err := io.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: reading %s: %v\n", url, err)
			os.Exit(1)
		}
		fmt.Printf("%s", b)
	}
}

```
