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

# Selectors

## Ready to use

```Javascript
const blogPostSelectors = createSelectors(blogPostSchema)
blogPostSelectors.findOneBlogPost(state, {
  author:{
    username: 'user1'
  }
})
blogPostSelectors.findAllBlogPost(state, {
  author:{
    username: 'user1'
  }
})
```

# Uses cases

## Add a new BlogPost model

```Javascript
   addEntity('blogPost', {
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
### Workflow

```Javascript
  addByIdEntity('blogPost', {
      byId: {
        '1': {
          ....,
          comments: ['comment1', ...],
          author: 'user1'
        }
      }
   })
  addAllIdsEntity('blogPost', ['1'])
```
```Javascript
  addByIdEntity('author', {
      byId: {
        '1': {
          'username': 'user1', name: 'User 1'
        }
      }
   })
   addAllIdsEntity('author', ['user1'])
```
```Javascript
  addByIdEntity('comment', {
    byId: {
      'comment1' : {
        comment: '.....'
      }
    }
   })
   addAllIdsEntity('comment', ['comment1'])
```
```Javascript
  addOneToOneEntity('blogPost', 'author', {
      source: '1',
      target: '1'
   })
```
```Javascript
  addOneToManyEntity('author', 'blogPost', {
      source: '1',
      target: '1'
   })
```
```Javascript
  addOneToManyEntity('blogPost', 'comment', {
      source: '1',
      target: 'comment1'
   })
```
## State

```Javascript
{
   entities: {
     blogPost: {
       byId: {
         '1': {
           comments: ['comment1', ...],
           author: 'user1'
         }
       },
       allIds: ['1'],
       references : {
         '1': {
            author: 'user1',
            comment: ['comment1']
         }
       }
     },
     author: {
       byId: {
         'user1': {
           'username': 'user1', name: 'User 1'
         }
       },
       allIds: ['1'],
       references: {
         blogPost: '1'
       }
     },
     comment: {
       byId: {
          'comment1' : {
             'comment': '...' 
          }
       },
       references: {
         'comment1' : {
           author: 'user1',
         }
       }
     }
   }
}
```


