#include<bits/stdc++.h>
using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        int n,target;
        cin>>n>>target;
        int a[n];
        for(int i=0;i<n;i++){
            cin>>a[i];
        }
        for(int i=0;i<n;i++){
            cout<<a[i]<<' ';
        }
        cout<<"\n";
    }
}