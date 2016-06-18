module.exports = {
    // Mock 数据返回
    'GET /users': [{name:'kenny wang'}, {name:'JSLite doc'}],
    'GET /users/1': {name:'卧槽'},
    'POST /users':function(data,url){
        console.log("data:::",data,data.a,url);
        return {name:'卧槽121221'}
    },
    'POST /users/2':"22323sd",
};