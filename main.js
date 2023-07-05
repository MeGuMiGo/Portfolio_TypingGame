// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const japanesefield = document.getElementById('japanese');
const mistyped = document.getElementById('mistyped');

// 日本語とローマ字を同時に表示する
const textLists = [
  { string:'スコットランド', typing:'sucottorando'}, { string:'パプアギューギニア', typing:'papuagyu-ginia'}, { string:'ギリシャ', typing:'girisya'},
  { string:'ネパール', typing:'nepa-ru'}, { string:'ブータン', typing:'bu-tan'}, { string:'アフガニスタン', typing:'afuganisutan'},
  { string:'オマール', typing:'oma-ru'}, { string:'イエメン', typing:'iemen'}, { string:'スーダン', typing:'su-dan'},
  { string:'ザンビア', typing:'zanbia'}, { string:'エチオピア', typing:'etiopia'}, { string:'ジンバブエ', typing:'jinnbabue'},
  { string:'日本', typing:'nipponn'}, { string:'中華人民共和国', typing:'tyuukajinnminnkyouwakoku'}, { string:'モンゴル', typing:'mongoru'},
  { string:'サウジアラビア', typing:'saujiarabia'}, { string:'ブラジル', typing:'burazil'}, { string:'台湾', typing:'taiwann'},
  { string:'南アフリカ', typing:'minamiafurika'}, { string:'ペルー', typing:'peru-'}, { string:'ウクライナ', typing:'ukuraina'},
  { string:'アメリカ', typing:'amerika'}, { string:'香港', typing:'honnkonn'}, { string:'スウェーデン', typing:'suwe-denn'},
  { string:'イタリア', typing:'italia'}, { string:'ミャンマー', typing:'myamma-'}, { string:'ニューカレドニア', typing:'nyu-karedonia'},
  { string:'オーストラリア', typing:'o-sutoralia'}, { string:'メキシコ', typing:'mekishiko'}, { string:'韓国', typing:'kannkoku'},
  { string:'カンボジア', typing:'kannbojia'}, { string:'ナイジェリア', typing:'naijeria'}, { string:'スロバキア', typing:'surobakia'},
  { string:'カナダ', typing:'kanada'}, { string:'グリーンランド', typing:'guri-nnrando'}, { string:'アイルランド', typing:'airuranndo'},
  ];

// ランダムなテキストを表示
const createText = () => {

// 正タイプした文字列をクリア
typed = '';
typedfield.textContent = typed;
  
// 配列のインデックス数からランダムな数値を生成する
let random = Math.floor(Math.random() * textLists.length);
  
// 配列からランダムにテキストを取得し画面に表示する
  japanese = textLists[random].string; // string key の valueを取得する場合
  untyped = textLists[random].typing; // typing key の valueを取得する場合    
  untypedfield.textContent = untyped;
  japanesefield.textContent = japanese;
};

// キー入力の判定
const keyPress = e => {
  // 誤タイプの場合
  if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
      // 100ms後に背景色を元に戻す
      setTimeout(() => {
       mistypingsound.play(); // ミスタイピング音  
       mistypingsound.currentTime = 0; 
       wrap.classList.remove('mistyped');
      }, 100);
    return;
  }
 // タイピング音 
  typingsound.play();
  typingsound.currentTime = 0;

  // 正タイプの場合
   // スコアのインクリメント
   score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
if(untyped === '') {
  createText();
  // 正解音 
  correctsound.play();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  
  // テキストを格納する変数を作る
  let text = '';
  
  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// カウントダウンタイマー
function timer(){
  var setTime = 15;//60秒に設定
  var second = 0;
  const circle = document.querySelector(".circle");
  const seconds = document.querySelector(".second");

  circle.classList.add('pie');
  //先ほどのアニメーションを書き換えてください
  circle.style.animation =  'pie '+ setTime*2 +'s linear';
      var timerId = setInterval(function() {
          second += 1;
          if(second >= setTime){
              clearInterval(timerId);
              japanesefield.textContent = 'タイムアップ！';
              //ローマ字のテキストが表示されているので非表示する
              untypedfield.style.display ='none'; 
              setTimeout(() => {
                const result = confirm(rankCheck(score));
            
                // OKボタンをクリックされたらリロードする
                 if(result == true) {
                   window.location.reload();
                 }    
               }, 100);
          }
          countTime = setTime - second;
          seconds.textContent= (countTime % 60);
          if(countTime < 10){  //10秒切ったら文字が赤くなります
              document.querySelector(".seconds").style.color = 'red';
          }
      }, 1000);
  }

// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();
  progressCircle.style.display ='';

  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
mistyped.style.display ='none';
const progressCircle = document.getElementById('progressCircle');
progressCircle.style.display = 'none';

// 効果音 要素
const typingsound = new Audio('sounds/タイピング.mp3');
const mistypingsound = new Audio('sounds/ミスタイピング.mp3');
const correctsound = new Audio('sounds/正解.mp3')
const play = document.getElementById('play');
const mute = document.getElementById('mute');

// ミュートボタン
mute.addEventListener('click', function(){
  if(typingsound.muted){
    typingsound.muted = false;
    mute.innerHTML = '<i class="fas fa-volume-mute"> 効果音OFF</i>';
  }else{
    typingsound.muted = true;
    mute.innerHTML = '<i class="fas fa-volume-up"> 効果音ON</i>';
  }
  if(mistypingsound.muted){
    mistypingsound.muted = false;
    mute.innerHTML = '<i class="fas fa-volume-mute"> 効果音OFF</i>';
  }else{
    mistypingsound.muted = true;
    mute.innerHTML = '<i class="fas fa-volume-up"> 効果音ON</i>';
  }
  if(correctsound.muted){
    correctsound.muted = false;
    mute.innerHTML = '<i class="fas fa-volume-mute"> 効果音OFF</i>';
  }else{
    correctsound.muted = true;
    mute.innerHTML = '<i class="fas fa-volume-up"> 効果音ON</i>';
  }
});
