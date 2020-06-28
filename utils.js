//未上传时下载预览
(function(){
    var fileUpload = document.getElementById('fileUpload');
    var file;
    fileUpload.onchage = function () {
        file = this.files[0];
    }

    btn.onclick = function () {
        var reader = new FileReader();
        reader.onload = function (event) {
            var url = event.target.result;
            var blob = new Blob([url]);
            //预览
            document.getElementById('imgNode').setAttribute('src', url);
            // var a = window.URL.creatObjectURL(blob);
            //下载
            var documentElement = document.createElement('a');
            documentElement.href = url;
            documentElement.download = 'wenjianming';
            document.body.appendChild(documentElement);
            documentElement.click();
            document.body.removeChild(documentElement)
            
        }
    }


})()

//下载预览获取文件流
(function(){
    var http = function(){}
    http({
        method: 'post',
        url: '/api',
        data: 'data/qs(data)',
        responseType: 'blob'
    });
    var file = {fileName, fileType, fileId}
    http().then(data => {
        var file = new File([data], fileName, {
            type: fileType,
            name: fileName
        });
        var url = URL.createObjectURL(file);
        //将url填入iframe预览,将url填入a链接下载
    })
})()
var treeList = [
    {
        id: 1,
        name: 'aa',
        child: [
            {
                id: 2,
                name: 'ab',
                child: [
                    {
                        id: 5,
                        name: 'abc',
                        child: []
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'ba',
        child: [
            {
                id: 4,
                name: 'bb',
                child: []
            }
        ]
    }]
//寻找父级、所有父级, 树转列，列转树
(function(){
    var searchId = 5;
    var _top = '';
    var _treeList = [...treeList];
    //所有父级
    function searchTopParent(searchId, treeList, topId, TopList){
        var _topList = topList || [];
        var _topId = topId || '';
        for(let i=0; i< treeList.length; i++){
            let tp = treeList[i];
            if(tp.id && tp.id === searchId){
                if(_topId !== ''){
                    topList.push(_topId);
                    searchTopParent(_topId, _treeList, '', _topList)
                }
            }else{
                if(tp.child.length > 0){
                    searchTopParent(searchId, tp.child, tp.id, _topList)
                }
            }
        }
        return _topList
    }
    var tpList = searchTopParent(searchId, treeList);
    console.log(tpList);
    //父级
    function searchParent(searchId, treeList, topId){
        var id = topId;
        treeList.forEach( (item, index)=> {
            var tp = item;
            if(tp.id === searchId){
                console.log(id)
            }else{
                if(tp.child.length > 0){
                    searchParent(searchId, tp.child, tp.id)
                }
            }
        });
    }
    var tpId = searchParent(searchId, treeList);
    console.log(tpId);

    //listToTree
    function listToTree(list, id=0, {idKey='id', pIdKey='pId', childrenKey='children'}={}){
        const result = list.filter(item => {
            return item[pIdKey] === id;
        }).map(res => {
            const tmp = {...res};
            tmp[childrenKey] = listToTree(list, tmp[idKey]);
            return tmp;
        })
    }

    //treeToList
    function treeToList(arr, tree){
        var list = arr;
        tree.forEach( item => {
            var _list = JSON.parse(JSON.stringify(item));
            _list.child = [];
            list.push(_list);
            if(item.child && item.child.length>0){
                treeToList(list, item.child)
            }
        });
        return list
    }

})()


