#include <bits/stdc++.h>
using namespace std;
#define ll long long
 
int main() {
 
 
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
 
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        int a[n];
        map<int,int> m;
        int l=INT_MAX,r=INT_MIN;
        for(int i=0;i<n;i++){
            cin>>a[i];
            m[a[i]]=i;
            if(a[i]==i+1){
                l=min(l,i);
                r=max(r,i);
            }
        }
        int k=0;
        for(int i=1;i<=n;i++){
            int pos1=i-1;
            int pos2=(m[i]);
            k=__gcd(k,abs(pos1-pos2));
        }
 
        cout<<k<<"\n";
    }
}