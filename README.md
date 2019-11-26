# redux-entity-schema

Automatically creates actions, reducers, selectors from a given entity name and a schema description.

The following example provides your a simple usage :

Let's imagine this JSON output from a API call 

```
{
   [
     {
       id: 'ID_1',
       author: {
         name: 'audie'
       },
       createdAt: 'today'
     },
    
     {
       id: 'ID_2',
       author: {
         name: 'mora'
       },
       createdAt: 'yesterday'
     },
     
   ]
}
```

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
  id: 'ID_1'
})
/*
{ 
  id: 'ID_1',
  author: {
    name: 'audie'
  }
 }
*/

// select all blog post written yesterday
blogPostSelectors.findAll(state, {
  createdAt: 'yesterday'
})
/*
{
  id: 'ID_2',
  author: {
    name: 'mora'
  },
  createdAt: 'yesterday'
},
*/

// select all blog post written by audie
const author = authorSelector.findOne(state, {
  name: 'audie'
})
blogPostSelectors.findAll(state, {
  author: {
    id: author.id
  }
})
/*
[{ 
  id: 'ID_1',
  author: {
    name: 'audie'
  }
 }]
*/

```
