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
            
            if(frq.count(s - a)) {
                cout << frq[s - a] + 1 << ' ' << i + 1 << endl;
                done = 1;
            }
            frq[a] = i;
            
        }
    }
    return 0;
}