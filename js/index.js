function parseLrc() {
  const lines = lrc.split('\n')
  const result = []
  lines.forEach(item => {
    const parts = item.split(']')
    const timeStr = parts[0].substring(1);
    const obj = {
      time: parseTime(timeStr),
      words: parts[1]
    }
    result.push(obj)
  })
  return result
}

function parseTime(times) {
  const parts = times.split(':')  
  return +parts[0] * 60 + + parts[1]
}

const lrcData = parseLrc();
console.log(lrcData,'lrcDatalrcData');

// 获取需要的 dom
var doms = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.container ul'),
  container: document.querySelector('.container'),
};

function findIndex() {
  const currentTime = doms.audio.currentTime
  for (let i = 0; i < lrcData.length; i++) {    
    if( currentTime  < lrcData[i].time){      
      return i -1
    } 
  }  
  return lrcData.length - 1
}

function createLrcElements() {
  var frag = document.createDocumentFragment(); // 文档片段
  lrcData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.words;
    frag.appendChild(li)
  })
  doms.ul.appendChild(frag);
}

createLrcElements()

// 容器高度
var containerHeight = doms.container.clientHeight;
// 每个 li 的高度
var liHeight = doms.ul.children[0].clientHeight;
// 最大偏移量
var maxOffset = doms.ul.clientHeight - containerHeight;

/**
 * 设置 ul 元素的偏移量
 */
function setOffset() {
  var index = findIndex();
  var offset = liHeight * index + liHeight / 2 - containerHeight / 2;
  if (offset < 0) {
    offset = 0;
  }
  if (offset > maxOffset) {
    offset = maxOffset;
  }
  doms.ul.style.transform = `translateY(-${offset}px)`;
  // 去掉之前的 active 样式
  var li = doms.ul.querySelector('.active');
  if (li) {
    li.classList.remove('active');
  }

  li = doms.ul.children[index];
  if (li) {
    li.classList.add('active');
  }
}

doms.audio.addEventListener('timeupdate', setOffset);