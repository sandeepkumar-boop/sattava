(() => {
  window.addEventListener("load", function () {
    const selects = document.querySelectorAll(".js-select");

    if (selects.length > 0) {
      selects.forEach((selectField) => {
        const select = selectField.querySelector("select");
        if (!select) return;

        const defOption = document.createElement("option");
        defOption.value = "";
        defOption.setAttribute("data-provinces", "[]");
        defOption.selected = true;
        defOption.disabled = true;

        const firstOption = select.querySelector("option:first-child");
        if (firstOption) {
          firstOption.remove();
        }

        select.prepend(defOption);
      });
    }
  });
})();