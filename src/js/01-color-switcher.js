class SwitchBodyColor {
  constructor() {
    this.bodyRef = document.querySelector('body');
    this.btnStartRef = document.querySelector('[data-start]');
    this.btnStopRef = document.querySelector('[data-stop]');
    this.timerId = null;
  }

  GetRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  SwitchColor() {
    this.bodyRef.style.backgroundColor = this.GetRandomHexColor();
  }
  btnStartToggleDis() {
    this.btnStartRef.disabled = this.btnStartRef.disabled ? false : true;
  }
  Listener() {
    this.btnStartRef.addEventListener('click', () => {
      this.SwitchColor();
      this.btnStartToggleDis();
      this.timerId = setInterval(() => {
        this.SwitchColor();
      }, 1000);
    });

    this.btnStopRef.addEventListener('click', () => {
      clearInterval(this.timerId);
      this.btnStartToggleDis();
    });
  }
  Init() {
    this.Listener();
  }
}

const bodyColor = new SwitchBodyColor();
bodyColor.Init();
