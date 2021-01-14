const $siteList =$('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const haspMap = xObject || [
    {logo:'A',logoType:'text', url:'https://www.acfun.cn'},
    {logo:"B",logoType:'image', url:"https://www.bilibili.com"},
]
const render=()=>{
    $siteList.find('li:not(.last').remove()
    haspMap.forEach(node=>{
        const $li = $(`
            <li>
                <a class='siteLink' href="${node.url}" target="_blank" rel="noopener noreferrer">
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${node.url}</div>
                    </div>
                </a>
    
            </li>
        `).insertBefore($lastLi)
    });
}
render();

$('.addButton')
    .on('click',()=>{
        let url = window.prompt('请添加网址')
        if(url.indexOf('http')!==0){
            url = 'https://'+ url;
        };    
        haspMap.push({
            logo:url[0],
            logoType:'text',
            url:url
        });
        render();
    });
    window.onbeforeunload = ()=>{
        const string = JSON.stringify(haspMap)
        localStorage.setItem('x',string)
    }