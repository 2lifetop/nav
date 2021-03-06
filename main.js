const $siteList =$('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo:'G',logoType:'text', url:'https://github.com'},
    {logo:"V",logoType:'text', url:"https://www.v2ex.com/"},
    {logo:"S",url:'https://stackoverflow.com/'},
    {logo:'M',url:'https://developer.mozilla.org/'},
    {logo:'L',url:'https://leetcode.com/'},
    {logo:'N',url:'https://www.nowcoder.com/'},
]
const simplifyUrl = (url)=>{
    return url.replace('https://','')
            .replace('http://','')
            .replace('www.','')
            .replace(/\/.*/,'') //删除链接/后的内容
}
const render=()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`
            <li>
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class='close'>
                        <svg class="icon">
                        <use xlink:href="#icon-remove"></use>
                    </svg>
                        </div>
                    </div>   
            </li>
        `).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index,1)
            render();
        })
    });
}
render();

$('.addButton')
    .on('click',()=>{
        let url = window.prompt('请添加网址')
        if(url.indexOf('http')!==0){
            url = 'https://'+ url;
        };    
        hashMap.push({
            logo:simplifyUrl(url)[0].toUpperCase(),
            logoType:'text',
            url:url
        });
        render();
    });
    window.onbeforeunload = ()=>{
        const string = JSON.stringify(hashMap)
        localStorage.setItem('x',string)
    }
    //监听键盘按键，快捷到达指点网站，存在bug，在搜索栏中依旧会生效
    // $(document).on('keypress',(e)=>{
    //     const {key} = e;
    //     for(let i=0;i<hashMap.length;i++){
    //        if(hashMap[i].logo.toLowerCase()===key){
    //            window.open(hashMap[i].url)
    //        }
    //     }
    // })