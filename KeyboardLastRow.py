# 키보드 맨 아래 줄 만으로 만들 수 있는 단어가 없다는 사실을 증명하기 위한 코드.
# https://github.com/dwyl/english-words 여기의 words_alpha.txt를 사용함.

import re

f = open('words_alpha.txt','r')

rule = re.compile('^[zxcvbnm]*$')

while True:
    word = f.readline()
    if not word: break
    m = rule.match(word)
    if not m: continue
    print(word.strip(), end=', ')

f.close()