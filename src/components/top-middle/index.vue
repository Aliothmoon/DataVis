<script>
import {ref} from "vue";

export default {
  name: "TopMiddleView",
  setup: () => {
    const trigger = ref(false);
    const a = {
      'border-radius': '0',
      'transform': 'scale(1.1)'
    }
    const b = {
      'width': '134px',
      'animation': 'opacity 1s ease-in-out'
    }
    const c = {
      'inset': '15px',
      'opacity': '1',
      'transform': 'rotate(0)'
    }
    const d = {
      'letter-spacing': '3px',
      'opacity': '1',
      'transform': 'translateX(-50%)',
    }
    const e = {
      'opacity': '1',
      'letter-spacing': '9.5px'
    }
    const f = {
      'animation': 'trail 1s ease-in-out'
    }
    setTimeout(() => {
      trigger.value = true;
    }, 200)
    return {
      trigger,
      a, b, c, d, e, f
    }
  }
}
</script>

<template>
  <div class="card all-box-shadow" :style="trigger && a">
    <div class="border" :style="trigger && c"></div>
    <div class="content">
      <div class="logo" :style="trigger && b">
        <div class="logo1">
        </div>
        <div class="logo2">
          <div style="color: white">数据可视化</div>
        </div>
        <span class="trail" :style="trigger && f"></span>
      </div>
      <span class="logo-bottom-text" :style="trigger && e">在线评测数据可视化</span>
    </div>
    <span class="bottom-text" :style="trigger && d">Power By Aliothmoon</span>
  </div>
</template>

<style scoped>
.card {
  width: 25vw;
  height: 13vh;
  background: #243137;
  position: relative;
  display: grid;
  place-content: center;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}


.border {
  position: absolute;
  inset: 0;
  border: 2px solid #bd9f67;
  opacity: 0;
  transform: rotate(10deg);
  transition: all 0.5s ease-in-out;
}

.bottom-text {
  position: absolute;
  left: 50%;
  bottom: 13px;
  transform: translateX(-50%);
  font-size: 6px;
  text-transform: uppercase;
  padding: 0 5px 0 8px;
  color: #bd9f67;
  background: #243137;
  opacity: 0;
  letter-spacing: 7px;
  transition: all 0.5s ease-in-out;
}

.content {
  transition: all 0.5s ease-in-out;
}

.content .logo {
  height: 35px;
  position: relative;
  width: 33px;
  overflow: hidden;
  transition: all 1s ease-in-out;
}

.content .logo .logo1 {
  height: 33px;
  position: absolute;
  left: 0;
}

.content .logo .logo2 {
  height: 33px;
  position: absolute;
  left: 33px;
}

.content .logo .trail {
  position: absolute;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
}

.content .logo-bottom-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 30px;
  color: #bd9f67;
  padding-left: 8px;
  font-size: 11px;
  opacity: 0;
  transition: all 0.5s ease-in-out 0.5s;
}

.card:hover {
  border-radius: 0;
  transform: scale(1.1);
}

.card:hover .logo {
  width: 134px;
  animation: opacity 1s ease-in-out;
}

.card:hover .border {
  inset: 15px;
  opacity: 1;
  transform: rotate(0);
}

.card:hover .bottom-text {
  letter-spacing: 3px;
  opacity: 1;
  transform: translateX(-50%);
}

.card:hover .content .logo-bottom-text {
  opacity: 1;
  letter-spacing: 9.5px;
}

.card:hover .trail {
  animation: trail 1s ease-in-out;
}

@keyframes opacity {
  0% {
    border-right: 1px solid transparent;
  }

  10% {
    border-right: 1px solid #bd9f67;
  }

  80% {
    border-right: 1px solid #bd9f67;
  }

  100% {
    border-right: 1px solid transparent;
  }
}

@keyframes trail {
  0% {
    background: linear-gradient(90deg, rgba(189, 159, 103, 0) 90%, rgb(189, 159, 103) 100%);
    opacity: 0;
  }

  30% {
    background: linear-gradient(90deg, rgba(189, 159, 103, 0) 70%, rgb(189, 159, 103) 100%);
    opacity: 1;
  }

  70% {
    background: linear-gradient(90deg, rgba(189, 159, 103, 0) 70%, rgb(189, 159, 103) 100%);
    opacity: 1;
  }

  95% {
    background: linear-gradient(90deg, rgba(189, 159, 103, 0) 90%, rgb(189, 159, 103) 100%);
    opacity: 0;
  }
}
</style>
