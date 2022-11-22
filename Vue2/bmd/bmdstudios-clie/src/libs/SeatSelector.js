/**
 * 描述座位
 */
class Seat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = 0; // 座位类型 0:未分配   1:普通座位   2:过道
    this.selected = false; //指定当前作为是否为选中状态
  }
}

/**
 * 描述座位选择面板
 */
class SeatSelector {
  //构造器，new创建对象时为属性赋值
  constructor(rows, cols, canvasId) {
    this.rows = rows;
    this.cols = cols;
    this.canvas = document.getElementById(canvasId);
    this.cvs = canvas.getContext("2d");
    // 自定义一些属性
    this.seatSize = 20; // 指定每一个座位的宽高像素值
    this.margin = 5; // 指定座位与座位之间的缝隙像素值

    // 初始化座位模板   （二维数组，每个元素都是一个Seat对象）
    this.seats = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row[j] = new Seat(i, j);
      }
      this.seats[i] = row;
    }

    // 为canvas初始化width与height
    this.canvas.width = cols * this.seatSize + (cols + 1) * this.margin;
    this.canvas.height = rows * this.seatSize + (rows + 1) * this.margin;
    this.canvas.style.display = "block";

    // 为canvas绑定事件
    this.canvas.addEventListener("mousedown", (event) => {
      let rect = this.canvas.getBoundingClientRect(); // 获取canvas在网页中的矩形区域
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      // 记录一下这个起始坐标点
      this.startPoint = { x, y };
    });

    // 为canvas绑定事件
    this.canvas.addEventListener("mouseup", (event) => {
      let rect = this.canvas.getBoundingClientRect(); // 获取canvas在网页中的矩形区域
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      // 记录一下这个起始坐标点
      this.endPoint = { x, y };

      // 根据起始点与结束点，整理出来一个矩形框对象： {x1,y1, x2,y2}   左上角点坐标   右下角点坐标
      let selectRect = {
        x1: Math.min(this.startPoint.x, this.endPoint.x),
        y1: Math.min(this.startPoint.y, this.endPoint.y),
        x2: Math.max(this.startPoint.x, this.endPoint.x),
        y2: Math.max(this.startPoint.y, this.endPoint.y),
      };

      // 判断每个座位是否在该矩形框内，如果是，则改变座位的selected属性
      // 遍历每一个座位
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          // 获取每一个座位
          let seat = this.seats[i][j];
          // 计算该座位在canvas中的上、下、左、右边界值
          let top = i * this.seatSize + (i + 1) * this.margin;
          let bottom = (i + 1) * this.seatSize + (i + 1) * this.margin;
          let left = j * this.seatSize + (j + 1) * this.margin;
          let right = (j + 1) * this.seatSize + (j + 1) * this.margin;
          // 经过判断，判断该座位是否不在矩形框
          if (
            top > selectRect.y2 ||
            left > selectRect.x2 ||
            bottom < selectRect.y1 ||
            right < selectRect.x1
          ) {
            // 没框住该座位
          } else {
            if (seat.type == 0) {
              //当前座位还未分配
              seat.selected = !seat.selected;
            }
          }
        }
      }
      this.draw();
    });
  }

  /** 绘制canvas中的内容 */
  draw() {
    // 清除所有像素点
    this.cvs.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // 绘制每一个座位
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // 根据当前座位类型的不同，绘制不同的样式
        let seat = this.seats[i][j];
        
        // 根据座位的类型，设置不同的颜色
        if (seat.type == 1) {
          // 普通座位 设置为红色
          this.cvs.fillStyle = "#a11";
          this.cvs.fillRect(
            j * this.seatSize + (j + 1) * this.margin,
            i * this.seatSize + (i + 1) * this.margin,
            this.seatSize,
            this.seatSize
          );
          continue;
        }

        // 根据座位的类型，设置不同的颜色
        if (seat.type == 2) {
          this.cvs.fillStyle = "#3333";
          this.cvs.fillRect(
            j * this.seatSize + (j + 1) * this.margin,
            i * this.seatSize + (i + 1) * this.margin,
            this.seatSize,
            this.seatSize
          );
          continue;
        }
        // 根据座位的选中未选中，设置不同的颜色
        if (seat.selected) {
          this.cvs.fillStyle = "#36D";
          this.cvs.fillRect(
            j * this.seatSize + (j + 1) * this.margin,
            i * this.seatSize + (i + 1) * this.margin,
            this.seatSize,
            this.seatSize
          );
        } else {
          this.cvs.fillStyle = "#36D6";
          this.cvs.fillRect(
            j * this.seatSize + (j + 1) * this.margin,
            i * this.seatSize + (i + 1) * this.margin,
            this.seatSize,
            this.seatSize
          );
        }
      }
    }
  }

  /**
   * 将所有的作为都设置为未选中，然后重新绘制即可
   */
  setNoSelect() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let seat = this.seats[i][j];
        seat.selected = false;
      }
    }
    this.draw();
  }

  /**
   * 将选中的座位的类型改为普通座位：type:1
   */
  setSelectedSeatsToNormalSeats() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let seat = this.seats[i][j];
        if (seat.selected) {
          seat.type = 1;
          seat.selected = false; // 将选中状态设置为false
        }
      }
    }
    this.draw();
  }

  /**
   * 将选中的座位的类型改为过道：type:2
   */
  setSelectedSeatsToGangway() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let seat = this.seats[i][j];
        if (seat.selected) {
          seat.type = 2;
          seat.selected = false; // 将选中状态设置为false
        }
      }
    }
    this.draw();
  }

  /**
   * 获取座位模板的json字符串
   */
  getSeatTemplateJsonString(){
    let rowNum = 0
    for (let i = 0; i < this.rows; i++) {
      // 判断当前这一排有没有不是过道的座位
      let rowData = this.seats[i]  // 当前这一排数据
      let filteredRowData = rowData.filter((item)=>{return item.type != 2})
      if(filteredRowData.length == 0){
        continue;
      }
      // 记录排号
      rowNum += 1

      // 记录列号
      let colNum = 0
      for (let j = 0; j < this.cols; j++) {
        let seat = this.seats[i][j];
        if (seat.type==0) {
          throw "还有未分配的座位"
        }else if(seat.type==1){
          colNum += 1
          seat.name = `${rowNum}排${colNum}号`
        }
      }
    }
    let str = JSON.stringify(this.seats)
    return str
  }

  /**
   * 获取模版中所有的座位数量
   */
  getSeatCount(){
    let count = 0
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let seat = this.seats[i][j];
        if (seat.type==1) {
          count++;
        }
      }
    }
    return count;
  }
}

export default SeatSelector;
