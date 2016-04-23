/*
ダウンロードありがとうございます

この組み込み専用関数は
modに自動更新を組み込むためのものです

前提としてGitHubが使えないといけないです
GitHubを使わない方法を私は知りません

使用する際には
[AutoUpdates]@武田家のうーたん
とお書きください

著作権は全て私にあります
著作権を侵害する行為は絶対におやめください
他の人に迷惑がかかります

+----------使用方法----------+
指定された部分を
modのどこかにコピーしてください

すると
AutoUpdates(Old,New);
が使えるようになります

アップデートがあるか確認したい時に呼び出してください

Oldにはいまのバージョンが入ります
modで変数にバージョンを格納しておくといいでしょう

例:OldVersion=1.0;

NewにはURLが入ります
ここでGitHubを使う必要性がでできます

URLは例の様なものにしてください
例:https://raw.githubusercontent.com/takedakenoutan/GitHub-test/master/NewText.txt
また文字列の状態でいれてください

この関数を呼び出すと
もし新しいバージョンがあったなら
true

なかったら
false

を返します

*----------使用例----------+
var OldVersion=1.0;

var NewVersion="https://raw.githubusercontent.com/takedakenoutan/GitHub-test/master/NewText.txt";

if(AutoUpdates(OldVersion,NewVersion)){
	print("新しいバージョンがあります");
}else if(!AutoUpdates(OldVersion,NewVersion)){
	print("新しいバージョンはありませんでした");
}

*/

//+--------ここから----------+
function AutoUpdates(Old,New)
{
	let temp,
	Thread = new java.lang.Thread
	(
		function()
		{
			android.os.Process.setThreadPriority(android.os.Process.THREAD_PRIORITY_BACKGROUND);
			let txt = new java.io.ByteArrayOutputStream();
			android.net.http.AndroidHttpClient.newInstance("userAgent").execute(new org.apache.http.client.methods.HttpGet(New)).getEntity().writeTo(txt);
			txt.close();
			let NewVersion = parseFloat(String(txt.toString()));
			if(NewVersion > Old)
			{
				temp = true;
			}else
			{
				temp = false;
			}
		}
	);
	Thread.start();
	Thread.join();
	return temp;
}
//+--------ここまでコピー----------+