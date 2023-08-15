import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

//import { Drivers } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {  
    if(!this._storage) {
      // If using, define drivers here: await this.storage.defineDriver(Drivers.LocalStorage);
      const storage = await this.storage.create();
      this._storage = storage;
    }
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    return await this._storage?.set(key, value);
  }
  public remove(key: string) {
    this._storage?.remove(key);
  }

  public clear(): Promise<any> {
    return this._storage?.clear();
  }

  public lenght() {
    return this._storage?.length();
  }

  public getKeys(): Promise<string[]> {
    return this._storage?.keys();
  }
  
  public getByKey(key: string): Promise<any> {
    return this._storage?.get(key);
  }

  public getAll(): Promise<any> {
    let data = new Array<any>();
    return this._storage?.forEach((d:any)=> {
      if(d) { data.push(d); }   
    }).then(() => {
      return data;
    });
  }

}