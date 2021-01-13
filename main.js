$('.addButton')
    .on('click',()=>{
        let url = window.prompt('请添加网址')    
    
        const $siteList = $('.siteList')
        const $lastLi = $siteList.find('li.last')
        const $li = $(`<li>
            <a class='siteLink' href="${url}" target="_blank" rel="noopener noreferrer">
                <div class="site">
                    <div class="logo">${url[0]}</div>
                    <div class="link">${url}</div>
                </div>
            </a>
        </li>`        
        ).insertBefore($lastLi)
    }
)