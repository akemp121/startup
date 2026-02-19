# CS 260 Notes

[Server Link](http://readforeign.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## Deployment

Simon:

```
./deployReact.sh -k ~/keys/production.pem -h yourdomain.click -s simon
```

Startup:

```
./deployReact.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

## GitHub

Today I created a repository based off of the template. I've cloned it to my machine and now I'm editing it with VSCode. I'm pretty unfamiliar with this program but hopefully we learn how to use it in this class. Markdown files are also new to me. 

## AWS Server Setup

Today I creaded an AWS server. The link to it is at the top of this page. Here is the code to SSH into it:

```
ssh -i <directory_to_pem> ubuntu@<ip_address>
```

## Domain Registration

I registered my server under the name (http://readforeign.click). 

## HTML Backbone

Recently I've been laying out the structure for my web application in HTML. Here are some important things that I learned:

- `<aside>` is how one can make a sidebar.
- `<article>` is what I'm using to put the generated article in.
- We wrap controls in `<form>` so that the sever will be able to send the user's inputs once that's working.
- The `<fieldset>` tag is used as a container for buttons and controls.
- I still need to get a better understanding of how the `<div>` and `<span>` tags work. I see them used all the time but I'm not sure where to implement them in my code.

## Page and Functionality Explanation

### Home

- User can create an account or login. _(Authentication)_

### Read

- There will be a sidebar on the left (not yet since I don't have CSS). The user can select the difficulty of the article they will read.
- The user can also add or delete their interests. _(Database)_
- The user can retreive a new article with the "Get New Article" button. _(3rd party connection)_
- The article appears on the right side of the screen. _(Application data)_
- In the footer, we can see the total number of articles read by everyone who's used the app. _(Websockets)_

### Practice

My goal is to eventually make this into a quiz screen where users can memorize their saved words. To avoid making this class too overwhelming, I'm simply displaying a list of the saved words to the users. 

- The user can see a list of their saved words. They can remove them. _(Database)_

### About

This is the same text that's on my GitHub. It tells the user about the application and how I thought of it. 

## CSS

Right now I'm learning more about CSS. Below are some things that will be helpful for me in the future:

### Hover

This allows us to conditionally format elements based on the user's actions and such. They're called pseudo-classes. Info here: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-classes).

```
section:hover {
  border-left: solid 1em purple;
}
```

### Link Style Sheet

I can use this to link the pages to my style sheet:

```
<link rel="stylesheet" href="styles.css" />
```

### Sizing Tokens

I can define sizing and spacing tokens at the top of my CSS styling sheet:

```
:root {
  /* Syntax: --name: value; */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;

  --color-primary: #007bff;
  --font-main: 'Helvetica', sans-serif;
}
```

And this is how they are referenced:

```
button {
  background-color: var(--color-primary);
  padding: var(--spacing-md); /* Uses the 16px token */
}
```

### FlexBox and Containers

Margins are rarely used anymore. Most people just use the `gap` property in FlexBox. 

You can replicate containers with the `<div>` element. You could put `class="container"` or something like that to style them all as FlexBoxes:

```
.container {
  display: flex; /* This turns on "Horizontal Container" mode */
  gap: var(--spacing-md); /* Uses your token! */
}

.sidebar {
  flex: 1; /* Like Fill Portions = 1 */
}

.content {
  flex: 3; /* Like Fill Portions = 3 */
}
```

### Breakpoints

This is how you can implement breakpoints:

```
/* Default Styles (Desktop First) */
.container {
  flex-direction: row; /* Sidebar next to Content */
}

/* The Breakpoint: When screen is smaller than 768px (Tablets/Phones) */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Stack them vertically */
  }
}
```

You can dynamically change all of your sizing tokens with this as well.

You _will_ be using grid! This is where you layout the general skeleton structure of the page. FlexBox is for the individual elements. 

### Fonts

If I want to host custom fonts on my server, I can do this:

```
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.ttf');
}

p {
  font-family: Quicksand;
}
```

Alternatively, I can just get them from Google:

```
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
  font-family: 'Rubik Microbe';
}
```

### Animations

You can put some super cool animations into your CSS like this:

```
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}
```

Then, you can change the keyframes:

```
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```

### More about flex boxes:

This is how you can justify horizontally and vertically:

```
justify-content: center; /* Centers vertically (Main Axis) */
align-items: center;     /* Centers horizontally (Cross Axis) */
```

## Simon Bootstrap example

I can't say I've learned much about Bootstrap. It seems to me like a BIG box of tools. Once I become familiar with them, I'll be able to make use of them. To me, it's looking like all we do is include `class="..."` inside of every element that we want to style and reference whatever Bootstrap has to offer. Is it more difficult than that?

## JavaScript

We can debug with print statements using:

```
console.log('message')
```

## JS, React, Node, Vite

HTML/CSS is the body and paint of the car. JS/React is the engine and drivetrain.

React is JS for the frontend. Node is JS for the backend. Node will be receiving all of our HTTP requests. The browser can't talk directly to the DB, so we need a middleman, which is Node. 

React allows us to build our own HTML components and tags. It's just like custom components in Power Apps. 

Vite is a build tool and development server. It takes JSX files (which the browser can't understand) and gives them to the browser as regular HTML/JS. It's very quick and updates immediately with changes to the file. It will be very useful when you're testing out your webpage. 

## Router

Not completely done with the tutorial yet, but react routers make it so that we can navigate to different pages within our website without reloading the page. In other words, we can swap out page components without reloading anything. This makes the website much easier and faster to use. 

BroswerRouter is the one that you're going to use the most.

We can define the URL paths for our website:

```
<Route path="/home" element={<Home />} />
```

We can define ID paths/custom paths like this:

```
<Route path="/book/:id" element={<Book />} />
```

Where ":id" can be anything.

We can define an "Error: 404" type page with this:

```
<Route path="*", element={<NotFound />} />
```

We can nest routes like this:

```
<Route path="/books">
  <Route index element={<BookList />} />
  <Route path=":id", element={<Book />} />
  <Route path="new", element={<NewBook />} />
</Route>
```

## Destructuring

Arrays

```
const a = [1, 2, 4, 5];

// destructure the first two items from a, into the new variables b and c
const [b, c] = a;

console.log(b, c);
// OUTPUT: 1, 2
```

Objects

```
const o = { a: 1, b: 'animals', c: ['fish', 'cats'] };

const { a, c } = o;

console.log(a, c);
// OUTPUT 1, ['fish', 'cats']
```
