---
layout: post
title:  "Learning Go, Day 2"
categories: learning go
---

Hello again,

Continuing from where we left off.

___
\
Let's start with Chapter 1.2

## 1.2 Command-Line Arguments

The `os` package. The command line args are available to any program in a Variable named `Args`. `os.Args` is a *slice* of strings. Can be accessed the same way as in Python.

`os.Args[0]` is the name of the command.

I mean, if you look at the syntax. Shit is pretty similar to Python ngl.
\
Here.

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	var s, sep string
	for i := 0; i < len(os.Args); i++ {
		s += sep + os.Args[i]
		sep = "\n"
	}
	fmt.Println(s)
}
```

It's kinda weird we don't have any parentheses around the `for` loop tho.

Also, using blank identifiers `_` is best practices.
Like here:
```go
package main

import (
	"fmt"
	"os"
)

func main() {
	s, sep := "", ""
	for _, arg := range os.Args[0:] {
		s += sep + arg
		sep = " "
	}
	fmt.Println(s)
}

```
Every `s+=` results in a creation of a new string. The garbage collector takes care of the ones no longer necessary.

When dealing with large data, a simpler and more efficient solution would be to use `strings.Join` from the `strings` package.
