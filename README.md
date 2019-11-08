# redux-entity-schema

Automatically creates actions, reducers, selectors from a given entity name.

The following example provides your a simple usage :

```Javascript
import {createSelectors, makeSchema} from 'redux-entity-schema'


const authorSchema = makeSchema("author")
const blogPostSchema = makeSchema("blogPost", {
  author: authorSchema
});

const authorSelector = createSelectors(authorSchema)
const blogPostSelectors = createSelectors(blogPostSchema);

// select one blog post by id
blogPostSelectors.findOne(state, {
  id: 1
})

// select all blog post written yesterday
blogPostSelectors.findAll(state, {
  createdAt: 'yesterday'
})

// select all blog post written by audie
const author = authorSelector.findOne(state, {
  name: 'audie'
})
blogPostSelectors.findAll(state, {
  author: {
    id: author.id
  }
})

```
