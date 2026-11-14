const CORRECT_PASSWORD = "20648";

if (sessionStorage.getItem("ourStoryAccessGranted") !== "yes") {
  document.documentElement.style.visibility = "hidden";

  document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.createElement("div");

    overlay.style.cssText = 
      position:fixed; inset:0; z-index:999999;
      background:#080808; color:white;
      display:flex; align-items:center; justify-content:center;
      font-family:Arial,sans-serif; text-align:center;
      padding:25px;
    ;

    overlay.innerHTML = 
      <div style="width:100%;max-width:350px">
        <h1 style="color:#e63946">Our Story ♥</h1>
        <p>المكان ده ليه حكاية خاصة</p>
        <p>اكتبي كلمة السر عشان تفتحيها ❤️</p>
        <input id="storyPassword" type="password"
          placeholder="كلمة السر"
          style="box-sizing:border-box;width:100%;padding:15px;
          border:1px solid #e63946;border-radius:10px;
          background:#171717;color:white;text-align:center;
          font-size:18px">
        <button id="storyEnter"
          style="margin-top:15px;width:100%;padding:14px;
          background:#e63946;color:white;border:0;
          border-radius:10px;font-size:17px">
          دخول ♥
        </button>
        <p id="storyError" style="color:#ff5555"></p>
      </div>
    ;

    document.body.appendChild(overlay);
    document.documentElement.style.visibility = "visible";

    function checkPassword() {
      const input = document.getElementById("storyPassword");

      if (input.value === CORRECT_PASSWORD) {
        sessionStorage.setItem("ourStoryAccessGranted", "yes");
        overlay.remove();
      } else {
        document.getElementById("storyError").textContent =
          "كلمة السر مش صحيحة، حاولي تاني";
      }
    }

    document.getElementById("storyEnter").onclick = checkPassword;
    document.getElementById("storyPassword").onkeydown = (e) => {
      if (e.key === "Enter") checkPassword();
    };
  });
}
