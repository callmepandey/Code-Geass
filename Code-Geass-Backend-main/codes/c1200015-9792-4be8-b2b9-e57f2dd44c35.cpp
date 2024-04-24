#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    int n , s;
    cin >> n >> s;
    unordered_map < int,int > frq;
    for(int i = 0;i<n;++i) {
        int a;
        cin >> a;
        if(frq[s - a]) {
            cout << s - a << ' ' << a;
            return 0;
        }
        ++frq[a];
    }
    return 0;
}