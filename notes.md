# CS 260 Notes

[Server Link](http://readforeign.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

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

