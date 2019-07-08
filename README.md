# Usage

```Javascript
   import {schema, oneToOne, oneToMany} from 'redux-schema'

   const blogPostSchema = schema('blogPost', {
     id: 'string',
     author: oneToOne('author'), 
     comments: oneToMany('comment')
   });
   const authorSchema = schema('author', {
     id: 'string',
     username: 'string',
     name: 'string'
   })
   const commentSchema = schema('comment', {
     id: 'string',
     author: oneToMany('blogPost'),
     comment: 'string'
   })
   const blogPostReducer = createReducer(blogPostSchema)
   const authorReducer = createReducer(authorSchema)
   const commentReducer = createReducer(commentSchema)

   const blogPostSelectors = createSelectors(blogPostSchema)
   const authorSelectors = createSelectors(authorSchema)
   const commentSelectors = createSelectors(commentSchema)
   
   const blogPostActions = createActions(blogPostSchema)
   const authorActions = createActions(authorSchema)
   const commentActions = createActions(commentSchema)
   
```

# Usage

## Actions

### Add a new BlogPost entity

```Javascript
   import {actions} from "./entities/blogPost"
   actions.addBlogPostEntity({
      id: '1',
      author: { id: 'user1', 'username: 'user1', name: 'User 1' },
      comments: [
      {
        id: 'comment1',
        author: { id: 'user2', username: 'user2', name: 'User 2' },
        comment: '.....'
      }
   })
```

## Selectors

```Javascript
const blogPostSelectors = createSelectors(blogPostSchema)
blogPostSelectors.find({
   id: 'id1'
 })
blogPostSelectors.findByAuthor({})
blogPostSelectors.findByComments({}
```



