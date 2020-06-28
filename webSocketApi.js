

function WebSocketApi(url){
    this.getMessage = (data) => {};

    this.socketClose = () => {
        this.websocket.close();
    };

    this.url = url;

    this.msg = '';  //?

    if ("WebSocket" in window) {
        this.websocket = new WebSocket(this.url);//创建socket对象
        console.log(this.websocket)
    } else {
        alert("该浏览器不支持websocket!");
        return
    };

    this.websocket.onopen = (e) => {
        console.log('open');
    };

    this.websocket.onmessage = (e) => {
        //console.log('message', e);
        this.getMessage(e);
        this.msg = e;
    };

    this.websocket.onerror = () => {
        console.log('error');
    };

    this.websocket.onclose = () => {
        console.log('close');
    };
}

function sendSocket(socket, data, callback){
    //console.log(socket, 'sendSocketsendSocket')
    socket.getMessage = callback;
    switch (socket.websocket.readyState) {
        //CONNECTING：值为0，表示正在连接。
        case socket.websocket.CONNECTING:
        //   setTimeout(function() {
        //     socket.websocket.send(data);
        //   }, 1000);
          break;
        //OPEN：值为1，表示连接成功，可以通信了。
        case socket.websocket.OPEN:
          socket.websocket.send(data);
          break;
        //CLOSING：值为2，表示连接正在关闭。
        case socket.websocket.CLOSING:
        //   setTimeout(function() {
        //     socket.send(data);
        //   }, 1000);
        //   break;
        //CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
        case socket.websocket.CLOSED:
          // do something
          break;
        default:
          // this never happens
          break;
      }
}

export {
    WebSocketApi,
    sendSocket
}