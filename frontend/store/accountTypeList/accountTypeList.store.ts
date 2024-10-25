import { AccountType } from "@/interface";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AccountBackendStorage } from "../storages/account.storage";

interface AccountState {
  //propriety
  account: Record<string, AccountType> | undefined;
  //methods
  addAccount: (account: AccountType) => void;
}

const AccountStoreApi: StateCreator<
  AccountState,
  [["zustand/devtools", never]]
> = (set) => ({
  account: undefined,
  addAccount: (account: AccountType) => {
    set((state) => ({
      account: {
        ...state.account,
        [String(account.pk)]: account
      }
    }));
  }

});

export const useAccountStore = create<AccountState>()(
  devtools(
    persist(AccountStoreApi, {
      name: "AccountStore",
      storage: AccountBackendStorage,
      //storage: fireBaseStorage,
    })
  )
);
