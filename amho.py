# 한국어 초성 시저 암호를 해석하기 위한 코드.

ctable = [18,1,0,2,4,3,5,6,8,7,10,9,11,13,12,14,15,16,17]
# 유니코드의 초성 테이블이, 초성 시저 암호를 만들기에 부적합하다.


def Hsplit(c):
    result = []
    if ord('가') <= ord(c) <= ord('힣'):
        c1 = (ord(c) - ord('가')) // 588
        c2 = ((ord(c) - ord('가')) - (588*c1)) // 28
        c3 = (ord(c) - ord('가')) - (588*c1) - 28 * c2
        result = [c1, c2, c3]
    else:
        result = [c]
    return result

def Hjoin(c1,c2,c3):
    return chr(ord('가') + ((c1 * 21) + c2) * 28 + c3)

while True:
    i = input()
    for c in i:
        if ord('가') <= ord(c) <= ord('힣'):
            cs = Hsplit(c)
            cs[0] = ctable[cs[0]]
            print(Hjoin(cs[0],cs[1],cs[2]), end='')
        else:
            print(c,end='')
    print()