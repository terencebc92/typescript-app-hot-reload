import { useEffect } from "react";
import * as SDK from "azure-devops-extension-sdk";

const App = () => {
  useEffect(() => {
    SDK.init({ loaded: false });
    SDK.register("hot-reload", {
      preload: () => {
        return {
          state: "ok",
          statusType: 0,
        };
      },
      load: () => {
        return {
          state: "ok",
          statusType: 0,
        };
      },
      reload: () => {
        return {
          state: "ok",
          statusType: 0,
        };
      },
    });
    SDK.notifyLoadSucceeded();
  }, []);
  return <div>React template tests TEST</div>;
};

export default App;
