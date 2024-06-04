---
layout: post
title:  "Learning Go, Day 1"
categories: learning go
---

Hi There!

Hope you're doing well.

I am also following the book "The Go Programming Language" by Alan A. A. Donovan & Brian W. Kernighan.
\
I will be using this book as a reference to learn Go. If you're a uni student, you can refer to this book for free from the Oreilly Learning Platform.

___
\
What I got to know so far:

1) It has garbage collection, a package system, first-class functions, lexical scope, a syscall interface, and immutable strings in text.

2) It has no implicit numerical conversions, no constructors, no destructors either. No operator overloading? No default parameter values? no inheritance? no generics? no exceptions? no macros? no function annotations? no thread-local storage? WTF?! Looks like I got to unlearn a lot of things \(🤓☝️)

3) It is backwards compatible, mature and stable.

4) Go is good for concurrent programming, and it has a built-in concurrency model called goroutines.

___
\
With that, Let's start with Chapter Numero Uno. :)

## 1.1 Hello, World!

Pretty self explanatory, right? Here's how you do simple string output in Go:

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}
```
___
\
Go is a compiled language. It is Go toolchain's job to convert a source program and the things it depends on into instructions in the native machine language.
\
Another interesting thing is, it natively handles Unicode characters. So, you can use any character from any language in your code.
\
Say for instance, you save this code as `hello.go`, you can run it using:
```bash
$ go build hello.go
$ ./hello
```
or simply:
```bash
$ go run hello.go
```

The book then goes into detail about the program itself. About how Go code is organized into packages, which are similar to libraries or modules in other languages. The `main` package is special, as it defines a standalone executable program, not a library. Each source file begins with a `package` declaration, which states which package the file belongs to. The `main` package is the entry point of the program. Importing a package is done using the `import` keyword. The `fmt` package is one of the standard library packages that come with Go. It provides functions for formatting text and reading input.

The program will not compile if there are any unused imports or variables. This is to ensure that the code is clean and maintainable.

Go takes formatting seriously. The `gofmt` tool automatically formats Go code according to a set of rules. This ensures that all Go code looks the same, no matter who wrote it. This is a good thing, as it makes it easier to read and understand code written by others. It is best practice to run `gofmt` on your code before committing it to version control.

___

# 1.2 Command-Line Arguments
