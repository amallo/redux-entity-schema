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



