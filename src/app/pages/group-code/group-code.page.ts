import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { switchMap } from 'rxjs/operators';
import {  BehaviorSubject, combineLatest, Observable } from 'rxjs';




export interface Item {
  displayName: string;
  group_code: string;
}

@Component({
  selector: 'app-group-code',
  templateUrl: './group-code.page.html',
  styleUrls: ['./group-code.page.scss'],
})
export class GroupCodePage {

  items$: Observable<Item[]>;
  group_codeFilter$: BehaviorSubject<string|null>;
  
  constructor(
    afs: AngularFirestore
    ) 
    {

    this.group_codeFilter$ = new BehaviorSubject(null);

    this.items$ = combineLatest(
      this.group_codeFilter$,
   
    ).pipe(switchMap(([group_code]) => 
      afs.collection<Item>('users', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (group_code) { query = query.where('group_code', '==', group_code) };
        return query;
      }).valueChanges()
    )
    );
  }
  filterBygroup_code(group_code: string|null) {
    this.group_codeFilter$.next(group_code); 
  }

}