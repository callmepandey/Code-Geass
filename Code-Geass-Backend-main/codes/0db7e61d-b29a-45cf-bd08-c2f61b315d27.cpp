#include<bits/stdc++.h>

using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        int n, target;
    	cin >> n>>target;
    	vector<int> a(n);
    	for (auto& x : a) {
    		cin >> x;
    	}
    	map<int, int> mp;
    	for (int i = 0; i < n; i++) {
    		mp[a[i]] = i;
    	}
    	
    	for (int i = 0; i < n; i++) {
    		int x = target - a[i];
    		if (mp.find(x) != mp.end() && mp[x] != i) {
    			cout << i+1 << ' ' << mp[x]+1 << "\n";
    			break;
    		}
    	}
    }
}