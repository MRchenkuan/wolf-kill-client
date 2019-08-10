export default {
    'joinGame': {
        url: '/join',
        method: 'post',
    },
    'createGame': {
        url: '/create',
        method: 'post',
    },
    'getOpenId': {
        url: '/openid',
        method: 'post',
    },
    'startGame': {
        url: '/start',
        method: 'post',
    },
    'resetGame':{
        url: '/reset',
        method: 'post',
    },
    'updateTable': {
        url: "/update",
        method: 'post'
    },
    'openAllRoles': {
        url: "/gameover",
        method: 'post'
    },
    'vote': {
      url: "/vote",
      method: 'post'
    },
    'createVote': {
      url: "/createvote",
      method: 'post'
    },
    'closeVote':{
      url: "/closevote",
      method: 'post'
    },
    'markPlayer': {
        url: "/markplayer",
        method: 'post'
    }, 
    'getTable':{
        url: "/sync",
        method: 'post'
    },
    'server': {
        url: "/server",
        method: 'post'
    },
    'bizinfo': {
        url: "/bizinfo",
        method: 'post'
    },
    "markSelf":{
      url: "/markself",
      method: "post"
    }
}

