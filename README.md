# css-modules-chunk-specificity-bug

Repository to demonstrate a bug in https://github.com/webpack-contrib/css-loader.

## To run:

```
git clone git@github.com:OHUSAR/css-modules-chunk-specificity-bug.git
cd css-modules-chunk-specificity-bug

npm install
npm start

open on localhost://3000
```

## What is this repo about?

Let's consider having these source files:

* a.module.css
    ```
    .test {
        background-color: red;
    }
    ```

* b.module.css
    ```
    .test2 {
        composes: test from "./a.module.css";
        background-color: blue;
    }
    ```
* c.module.css
    ```
    .test3 {
        composes: test from "./a.module.css";
        background-color: green;
    }
    ```

<br/>
The output of these files would be:

* a.module.css
    ```
    .test {
        background-color: red;
    }
    ```

* b.module.css
    ```
    .test {
        background-color: red;
    }

    .test2 {
        background-color: blue;
    }
    ```
* c.module.css
    ```
    .test {
        background-color: red;
    }

    .test3 {
        background-color: green;
    }
    ```
<br/>
Now let's consider that our code dynamically imports chunk with output of a.module.css and c.module.css and than later imports chunk with b.module.css output.

The current applied css would be:

```
    .test {
        background-color: red;
    }

    .test {
        background-color: red;
    }

    .test3 {
        background-color: green;
    }

    .test {
        background-color: red;
    }

    .test2 {
        background-color: blue;
    }

```

When considering element using classnames from c.module.css,
```
    <div class="test_localname test3_localname" />
```
the applied background color of the C element would be red instad of green. The reason for this is that the class `.test` is included later in the css hierarchy and therefore is used for element style.

<br/>

Possible solution is to change the output of files depending on composes, bumping its specificity. Something like:

* a.module.css
    ```
    .test {
        background-color: red;
    }
    ```

* b.module.css
    ```
    .test {
        background-color: red;
    }

    .test2.test2 {
        background-color: blue;
    }
    ```
* c.module.css
    ```
    .test {
        background-color: red;
    }

    .test3.test3 {
        background-color: green;
    }
    ```

Which in our example the current applied css would be:

```
    .test {
        background-color: red;
    }

    .test {
        background-color: red;
    }

    .test3.test3 {
        background-color: green;
    }

    .test {
        background-color: red;
    }

    .test2.test2 {
        background-color: blue;
    }

```

This way the C element from example above will always have the green backgroundt. 

## This bug is related to:

https://github.com/webpack-contrib/css-loader/issues/1047 (Css class got duplicated if @import sytnax is used)
https://github.com/webpack-contrib/css-loader/issues/997 (ICSS: Importing a composed class name produces wrong output)
