/*global $ :true*/
$(function () {
  /**get dom elem */
  var $width = $("#width"),
    $height = $("#height"),
    $btnCal = $("#calculate"),
    $btnRet = $("#reset"),
    $perimeter = $("#perimeter"),
    $area = $("#area");

  /**calc button click event */
  $btnCal.click(clickCalc)
  $(document).keydown(function (event) {
    if (event.keyCode == 13) {
      clickCalc();
    }
  });

  function clickCalc() {
    // validata if error return
    if (!validata('#width') || !validata('#height')) return;

    //get value
    var w = Number($width.val()),
      h = Number($height.val());
    //calculate
    var p = 2 * FloatAdd(w, h),
      a = FloatMul(w, h);

    // var rect = rectangle();
    // output
    $perimeter.val(p);
    $area.val(a);
  };
  $btnRet.click(function () {
    $width.val('');
    $height.val('');
    $perimeter.val('');
    $area.val('');
  })

  // 1.event keypress
  // 2.event argument get key value e.keyboard-confirm
  // 3.e.preventDefault()
  $width.keypress(function (e) {
    if (/[abcdf-zABCDF-Z`~!@#$%^&*()\=_+[\]{}|;:'",<>/?\\]/.test(e.key)) {
      e.preventDefault();
      return;
    }
    
    // 合法字符e
    // 允许出现在非科学计数法的数字末尾
    // 允许出现在非科学计数法的数字中间
    //
    // 不允许出现在非科学计数法的数字钱面
    // 不允许出现在空文本
    // 不不允许出现在负号后面
    // 不允许出现在科学计数法（e 和 E）数字的末尾
    // 不允许出现科学计数法数字的钱面
    // 不允许出现在科学计数法数字的中间
    var pos = e.target.selectionStart,
      con = e.target.value;
    console.log(pos, con);
    if (e.key === 'e') {
      if (pos === 0 || con.indexOf('e') !== -1 || con.indexOf('E') !== -1) {
        e.preventDefault();
        return;
      }
      if (pos === 1 && con.substring(0, 1) === '-') {
        e.preventDefault();
        return;
      }
    }
    // 合法字符 E

    // 合法字符 .
  })
  $height.keypress(function (e) {
    if (/[abcdf-zABCDF-Z`~!@#$%^&*()\-=_+[\]{}|;:'",<>/?\\]/.test(e.key)) {
      e.preventDefault();
      return;
    }
  })
  $width.focusout(function () {
    // if (!validata()) select this
    if (!validata('#width')) $width.select()
  })
  $height.focusout(function () {
    if (!validata('#height')) $height.select()
  })

  function validata(filed) {
    // get DOM
    var $data = $(filed),
      $text = filed.substring(1),
      $msg = $(`${filed}-validation-message`);
    // validata null
    if ($data.val() === '') {
      if ($text == 'width') {
        $msg.html('宽度不能为空');
      } else {
        $msg.html('高度不能为空');
      }
      // $data.select();
      return false;
    }
    // validata number
    if (!/^-?(0|[1-9]\d*)(\.\d*)?([eE][+-]?\d+)?$/.test($data.val())) {
      $msg.html('必须是数值');
      $data.select();
      return false;
    }
    // validata >0
    if (Number($data.val()) < 0) {
      $msg.html('必须大于0');
      // $data.select();
      return false;
    }
    // prompt error message
    // return false
    $msg.html('');
    return true
  }
});
//加法运算精度处理
function FloatAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
//乘法运算精度处理
function FloatMul(arg1, arg2) {
  var m = 0;
  try {
    m += arg1.toString().split(".")[1].length
  } catch (e) {
    console.log(e)
  }
  try {
    m += arg2.toString().split(".")[1].length
  } catch (e) {
    console.log(e)
  }
  return Number(arg1.toString().replace(".", "")) * Number(arg2.toString().replace(".", "")) / Math.pow(10, m);
}