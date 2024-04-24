#include <bits/stdc++.h>
using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        int n,target;
        cin>>n>>target;
        int a[n];
        for(int i=0;i<n;i++) cin>>a[i];
        int f=0;
        sort(a,a+n);
        int l=0,r=n-1;
        while(l<=r){
            int mid=(l+r)/2;
            if(a[mid]==target){
                f=1;
                break;
            }
            else if(a[mid]>target) r=mid-1;
            else l=mid+1;
        }
        cout<<f<<"\n";
    }
    
}