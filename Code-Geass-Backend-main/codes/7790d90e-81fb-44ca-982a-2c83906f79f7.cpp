#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    int t;
    cin >> t;
    while(t--) {
    int n , s;
    cin >> n >> s;
    unordered_map < int,int > frq;
    int done = 0;
        for(int i = 0;i<n;++i) {
            int a;
            cin >> a;
            
            if(done == 0 && frq[s - a]) {
                cout << s - a << ' ' << a << endl;
                done = 1;
            }
            ++frq[a];
            
        }
    }
    return 0;
}