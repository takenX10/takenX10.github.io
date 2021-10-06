 
 // thanks to StackOverflow.
 function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
var inlineCodeStyle = 'display: inline-block; margin-bottom: 0; color:red';
var inlineCodeClass = '';
var codeStyle = 'background-color: hsl(180, 20%, 95%); overflow: auto;';
var codeClass = 'my-3 border border-secondary p-2';
var imgTags = 'style="" class="img-fluid p-3"';

 // The order in which the elements are contained in matchlist influence the output.
var matchlist = {
    "list":[
        {
            "begin":">",
            "end":"\n",
            "begin_replace": "<div style='background-color:hsl(180, 20%, 95%); border-radius:0 5px 5px 0; padding: 1%; padding-bottom:0.5%;'><p>",
            "end_replace":"</p></div>"
        },
        {
            "begin":"###",
            "end":"###",
            "begin_replace": "<h3 class='my-3'>",
            "end_replace":"</h3>"
        },
        {
            "begin":"^#",
            "end":"\n",
            "begin_replace": "<h1 class='fs-1 fw-bold mb-5'>",
            "end_replace":"</h1>"
        },
        {
            "begin":"\\*\\*",
            "end":"\\*\\*",
            "begin_replace": "<b>",
            "end_replace":"</b>"
        }
    ]

}

/*
Split the text into two parts:
1. code parts ...
    - They gets escaped and nothing else gets changed, 
      we split for triple backslash and single backslash.
2. MarkDown parts ...
    - Translated following the matchlist pattern, with the exceptions of link 
      and images. Each instruction gets translated following the order of the 
      matchlist, so its really important to sort the matchlist keeping in mind 
      that each character that gets replaced can be replaced by the next instruction.
*/
function parseText(text){
    text = decodeURIComponent(text);
    text = JSON.parse(text);
    t = text['content'].split('```');
    for(i = 0; i <t.length; i++){
        if(i%2==0){
            w = t[i].split('`');
            for(j = 0; j< w.length; j++){
                if(j%2==0){
                    matchlist['list'].forEach((val) => {
                        let reg = new RegExp(`${val['begin']}.*?${val['end']}`, 'gm');
                        w[j] = w[j].replace(reg, function(x){
                            x = x.replace(val['begin'].replace(/\\/g,'').replace('^',''),'');
                            x = x.replace(val['end'].replace(/\\/g,'').replace('^',''),'');
                            return val['begin_replace'] + x + val['end_replace'];
                        });
                    });
                    /*
                        Easter egg: I spent two hours trying to debug the regex
                        below because it wasn't matching the second url in the text...
                        turns out I forgot the gm identifier. No comment.
                    */
                    // Alone links
                    let reg = new RegExp(`http(s)?:\\/\\/.*?([ \\0\\n<]|$)`, 'gm');
                    console.log(w[j]);
                    w[j] = w[j].replace(reg, function(x){
                        const itemset = new Set(['\0','<','\n',' ']);
                        var last = '';
                        if(itemset.has(x[x.length-1])){
                            last = x[x.length-1];
                            x = x.substring(0,x.length-1);
                        }
                        let index = w[j].indexOf(x);
                        if (w[j].substring(index-2,index) == ']('){
                            return x;
                        }
                        return '<a href="'+x+'">'+x+'</a>'+last;
                    });
                    // images
                    reg = new RegExp(`\\!\\[.*?\\]\\(.*?\\)`, 'gm');
                    w[j] = w[j].replace(reg, function(x){
                        var alt = x.split(']')[0];
                        alt = alt.substring(2,alt.length);
                        var url = x.split('(')[1];
                        url = url.substring(0,url.length-1);
                        return '<img src="'+url+'"'+imgTags+'>';
                    });
                    // Links
                    reg = new RegExp(`\\[.*?\\]\\(.*?\\)`, 'gm');
                    w[j] = w[j].replace(reg, function(x){
                        console.log(x);
                        var alt = x.split(']')[0];
                        alt = alt.substring(1,alt.length);
                        var url = x.split('(')[1];
                        url = url.substring(0,url.length-1);
                        return '<a href="'+url+'">'+alt+'</a> ';
                    });
                }else{
                    w[j] = '<p style="'+inlineCodeStyle+'" class="'+inlineCodeClass+'">' + w[j] + '</p>';
                } 
            }
            t[i] = ""
            for(j=0; j < w.length; j++){
                t[i] += w[j];
            }
        }else{
            t[i] = '<br><p style="'+codeStyle+'" class="'+codeClass+'">' + escapeHtml(t[i]) + '</p><br>';
        }
    }
    var finaltext = "";
    for(i = 0; i < t.length; i++){
        finaltext = finaltext + t[i];
    }
    document.getElementById('writeup-text').innerHTML = finaltext;
}