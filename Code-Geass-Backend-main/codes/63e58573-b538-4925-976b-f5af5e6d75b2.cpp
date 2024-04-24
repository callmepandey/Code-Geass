#include<bits/stdc++.h>
using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        int n,target;
        cin>>n>>target;
        int a[n];
        map<int,int> m;
        for(int i=0;i<n;i++){
            cin>>a[i];
            m[a[i]]=i;
        }
        for(int i=0;i<n;i++){
            int p=a[i]-target;
            if(m.count(p)!=0 && p!=a[i]){
                cout<<m[a[i]]<<" "<<m[p]<<"\n";
                break;
            }
        }
    }
}