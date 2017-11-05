import sys
from textblob import TextBlob


def main():
#    fun_avg	= 0.2213;
#    anger_avg = 0.037;
#    love_avg = 0.3797;
    message = sys.argv[1];
    tb = TextBlob(message);
    num = tb.sentiment.polarity;
    
    if(num < -0.1 and num > -1):
        pos = hex(int(round(153-num * -152)))
        pos = str (pos)
        if(len(pos)==3):
            print('#0'+ pos[2]+'0'+pos[2]+'ff')
        else:
            print('#'+ pos[2]+pos[3]+ pos[2]+pos[3]+'ff')
        
        sys.stdout.flush()
    if(num > 0.1 and num < 1):
        pos = hex(int(round(150-num * 150)))
        pos = str (pos)
        if(len(pos)==3):
            print('#ff0'+ pos[2]+'0'+pos[2])
        else:
            print('#ff'+ pos[2]+pos[3]+pos[2]+pos[3])
            
        sys.stdout.flush()
    else:
        print('#e0e0e0')
        sys.stdout.flush()

main()