
/**This notice must be untouched at all times.
This is the COMPRESSED version of the Draw2D Library
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/
var draw2d = new Object();
draw2d.Event = function() {
   this.type = null;
   this.target = null;
   this.relatedTarget = null;
   this.cancelable = false;
   this.timeStamp = null;
   this.returnValue = true;
   };
draw2d.Event.prototype.initEvent = function(sType, _591e) {
   this.type = sType;
   this.cancelable = _591e;
   this.timeStamp = (new Date()).getTime();
   };
draw2d.Event.prototype.preventDefault = function() {
   if(this.cancelable) {
      this.returnValue = false;
      }
   };
draw2d.Event.fireDOMEvent = function(_591f, _5920) {
   if(document.createEvent) {
      var evt = document.createEvent("Events");
      evt.initEvent(_591f, true, true);
      _5920.dispatchEvent(evt);
      }
   else {
      if(document.createEventObject) {
         var evt = document.createEventObject();
         _5920.fireEvent("on" + _591f, evt);
         }
      }
   };
draw2d.EventTarget = function() {
   this.eventhandlers = new Object();
   };
draw2d.EventTarget.prototype.addEventListener = function(sType, _5923) {
   if(typeof this.eventhandlers[sType] == "undefined") {
      this.eventhandlers[sType] = new Array;
      }
   this.eventhandlers[sType][this.eventhandlers[sType].length] = _5923;
   };
draw2d.EventTarget.prototype.dispatchEvent = function(_5924) {
   _5924.target = this;
   if(typeof this.eventhandlers[_5924.type] != "undefined") {
      for(var i = 0; i < this.eventhandlers[_5924.type].length; i++) {
         this.eventhandlers[_5924.type][i](_5924);
         }
      }
   return _5924.returnValue;
   };
draw2d.EventTarget.prototype.removeEventListener = function(sType, _5927) {
   if(typeof this.eventhandlers[sType] != "undefined") {
      var _5928 = new Array;
      for(var i = 0; i < this.eventhandlers[sType].length; i++) {
         if(this.eventhandlers[sType][i] != _5927) {
            _5928[_5928.length] = this.eventhandlers[sType][i];
            }
         }
      this.eventhandlers[sType] = _5928;
      }
   };
draw2d.ArrayList = function() {
   this.increment = 10;
   this.size = 0;
   this.data = new Array(this.increment);
   };
draw2d.ArrayList.EMPTY_LIST = new draw2d.ArrayList();
draw2d.ArrayList.prototype.reverse = function() {
   var _539d = new Array(this.size);
   for(var i = 0; i < this.size; i++) {
      _539d[i] = this.data[this.size - i - 1];
      }
   this.data = _539d;
   };
draw2d.ArrayList.prototype.getCapacity = function() {
   return this.data.length;
   };
draw2d.ArrayList.prototype.getSize = function() {
   return this.size;
   };
draw2d.ArrayList.prototype.isEmpty = function() {
   return this.getSize() == 0;
   };
draw2d.ArrayList.prototype.getLastElement = function() {
   if(this.data[this.getSize() - 1] != null) {
      return this.data[this.getSize() - 1];
      }
   };
draw2d.ArrayList.prototype.getFirstElement = function() {
   if(this.data[0] != null) {
      return this.data[0];
      }
   };
draw2d.ArrayList.prototype.get = function(i) {
   return this.data[i];
   };
draw2d.ArrayList.prototype.add = function(obj) {
   if(this.getSize() == this.data.length) {
      this.resize();
      }
   this.data[this.size++] = obj;
   };
draw2d.ArrayList.prototype.addAll = function(obj) {
   for(var i = 0; i < obj.getSize(); i++) {
      this.add(obj.get(i));
      }
   };
draw2d.ArrayList.prototype.remove = function(obj) {
   var index = this.indexOf(obj);
   if(index >= 0) {
      return this.removeElementAt(index);
      }
   return null;
   };
draw2d.ArrayList.prototype.insertElementAt = function(obj, index) {
   if(this.size == this.capacity) {
      this.resize();
      }
   for(var i = this.getSize(); i > index; i--) {
      this.data[i] = this.data[i - 1];
      }
   this.data[index] = obj;
   this.size++;
   };
draw2d.ArrayList.prototype.removeElementAt = function(index) {
   var _53a9 = this.data[index];
   for(var i = index; i < (this.getSize() - 1); i++) {
      this.data[i] = this.data[i + 1];
      }
   this.data[this.getSize() - 1] = null;
   this.size--;
   return _53a9;
   };
draw2d.ArrayList.prototype.removeAllElements = function() {
   this.size = 0;
   for(var i = 0; i < this.data.length; i++) {
      this.data[i] = null;
      }
   };
draw2d.ArrayList.prototype.indexOf = function(obj) {
   for(var i = 0; i < this.getSize(); i++) {
      if(this.data[i] == obj) {
         return i;
         }
      }
   return - 1;
   };
draw2d.ArrayList.prototype.contains = function(obj) {
   for(var i = 0; i < this.getSize(); i++) {
      if(this.data[i] == obj) {
         return true;
         }
      }
   return false;
   };
draw2d.ArrayList.prototype.resize = function() {
   newData = new Array(this.data.length + this.increment);
   for(var i = 0; i < this.data.length; i++) {
      newData[i] = this.data[i];
      }
   this.data = newData;
   };
draw2d.ArrayList.prototype.trimToSize = function() {
   var temp = new Array(this.getSize());
   for(var i = 0; i < this.getSize(); i++) {
      temp[i] = this.data[i];
      }
   this.size = temp.length - 1;
   this.data = temp;
   };
draw2d.ArrayList.prototype.sort = function(f) {
   var i, j;
   var _53b5;
   var _53b6;
   var _53b7;
   var _53b8;
   for(i = 1; i < this.getSize(); i++) {
      _53b6 = this.data[i];
      _53b5 = _53b6[f];
      j = i - 1;
      _53b7 = this.data[j];
      _53b8 = _53b7[f];
      while(j >= 0 && _53b8 > _53b5) {
         this.data[j + 1] = this.data[j];
         j--;
         if(j >= 0) {
            _53b7 = this.data[j];
            _53b8 = _53b7[f];
            }
         }
      this.data[j + 1] = _53b6;
      }
   };
draw2d.ArrayList.prototype.clone = function() {
   var _53b9 = new draw2d.ArrayList(this.size);
   for(var i = 0; i < this.size; i++) {
      _53b9.add(this.data[i]);
      }
   return _53b9;
   };
draw2d.ArrayList.prototype.overwriteElementAt = function(obj, index) {
   this.data[index] = obj;
   };
function trace(_574f) {
   var _5750 = openwindow("about:blank", 700, 400);
   _5750.document.writeln("<pre>" + _574f + "</pre>");
   }
function openwindow(url, width, _5753) {
   var left = (screen.width - width) / 2;
   var top = (screen.height - _5753) / 2;
   property = "left=" + left + ", top=" + top + ", toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,alwaysRaised,width=" + width + ",height=" + _5753;
   return window.open(url, "_blank", property);
   }
function dumpObject(obj) {
   trace("----------------------------------------------------------------------------");
   trace("- Object dump");
   trace("----------------------------------------------------------------------------");
   for(var i in obj) {
      try {
         if(typeof obj[i] != "function") {
            trace(i + " --&gt; " + obj[i]);
            }
         }
      catch(e) {
         }
      }
   for(var i in obj) {
      try {
         if(typeof obj[i] == "function") {
            trace(i + " --&gt; " + obj[i]);
            }
         }
      catch(e) {
         }
      }
   trace("----------------------------------------------------------------------------");
   }
draw2d.Drag = function() {
   };
draw2d.Drag.current = null;
draw2d.Drag.currentTarget = null;
draw2d.Drag.dragging = false;
draw2d.Drag.isDragging = function() {
   return this.dragging;
   };
draw2d.Drag.setCurrent = function(_45e3) {
   this.current = _45e3;
   this.dragging = true;
   };
draw2d.Drag.getCurrent = function() {
   return this.current;
   };
draw2d.Drag.clearCurrent = function() {
   this.current = null;
   this.dragging = false;
   };
draw2d.Draggable = function(_45e4, _45e5) {
   draw2d.EventTarget.call(this);
   this.construct(_45e4, _45e5);
   this.diffX = 0;
   this.diffY = 0;
   this.targets = new draw2d.ArrayList();
   };
draw2d.Draggable.prototype = new draw2d.EventTarget;
draw2d.Draggable.prototype.construct = function(_45e6, _45e7) {
   this.element = _45e6;
   this.constraints = _45e7;
   var oThis = this;
   var _45e9 = function() {
      var _45ea = new draw2d.DragDropEvent();
      _45ea.initDragDropEvent("dblclick", true);
      oThis.dispatchEvent(_45ea);
      var _45eb = arguments[0] || window.event;
      _45eb.cancelBubble = true;
      _45eb.returnValue = false;
      };
   var _45ec = function() {
      var _45ed = arguments[0] || window.event;
      var _45ee = new draw2d.DragDropEvent();
      var _45ef = oThis.node.workflow.getAbsoluteX();
      var _45f0 = oThis.node.workflow.getAbsoluteY();
      var _45f1 = oThis.node.workflow.getScrollLeft();
      var _45f2 = oThis.node.workflow.getScrollTop();
      _45ee.x = _45ed.clientX - oThis.element.offsetLeft + _45f1 - _45ef;
      _45ee.y = _45ed.clientY - oThis.element.offsetTop + _45f2 - _45f0;
      if(_45ed.button == 2) {
         _45ee.initDragDropEvent("contextmenu", true);
         oThis.dispatchEvent(_45ee);
         }
      else {
         _45ee.initDragDropEvent("dragstart", true);
         if(oThis.dispatchEvent(_45ee)) {
            oThis.diffX = _45ed.clientX - oThis.element.offsetLeft;
            oThis.diffY = _45ed.clientY - oThis.element.offsetTop;
            draw2d.Drag.setCurrent(oThis);
            if(oThis.isAttached == true) {
               oThis.detachEventHandlers();
               }
            oThis.attachEventHandlers();
            }
         }
      _45ed.cancelBubble = true;
      _45ed.returnValue = false;
      };
   var _45f3 = function() {
      if(draw2d.Drag.getCurrent() == null) {
         var _45f4 = arguments[0] || window.event;
         if(draw2d.Drag.currentHover != null && oThis != draw2d.Drag.currentHover) {
            var _45f5 = new draw2d.DragDropEvent();
            _45f5.initDragDropEvent("mouseleave", false, oThis);
            draw2d.Drag.currentHover.dispatchEvent(_45f5);
            }
         if(oThis != null && oThis != draw2d.Drag.currentHover) {
            var _45f5 = new draw2d.DragDropEvent();
            _45f5.initDragDropEvent("mouseenter", false, oThis);
            oThis.dispatchEvent(_45f5);
            }
         draw2d.Drag.currentHover = oThis;
         }
      else {
         }
      };
   if(this.element.addEventListener) {
      this.element.addEventListener("mousemove", _45f3, false);
      this.element.addEventListener("mousedown", _45ec, false);
      this.element.addEventListener("dblclick", _45e9, false);
      }
   else {
      if(this.element.attachEvent) {
         this.element.attachEvent("onmousemove", _45f3);
         this.element.attachEvent("onmousedown", _45ec);
         this.element.attachEvent("ondblclick", _45e9);
         }
      else {
         throw new Error("Drag not supported in this browser.");
         }
      }
   };
draw2d.Draggable.prototype.attachEventHandlers = function() {
   var oThis = this;
   oThis.isAttached = true;
   this.tempMouseMove = function() {
      var _45f7 = arguments[0] || window.event;
      var _45f8 = new draw2d.Point(_45f7.clientX - oThis.diffX, _45f7.clientY - oThis.diffY);
      if(oThis.node.getCanSnapToHelper()) {
         _45f8 = oThis.node.getWorkflow().snapToHelper(oThis.node, _45f8);
         }
      oThis.element.style.left = _45f8.x + "px";
      oThis.element.style.top = _45f8.y + "px";
      var _45f9 = oThis.node.workflow.getScrollLeft();
      var _45fa = oThis.node.workflow.getScrollTop();
      var _45fb = oThis.node.workflow.getAbsoluteX();
      var _45fc = oThis.node.workflow.getAbsoluteY();
      var _45fd = oThis.getDropTarget(_45f7.clientX + _45f9 - _45fb, _45f7.clientY + _45fa - _45fc);
      var _45fe = oThis.getCompartment(_45f7.clientX + _45f9 - _45fb, _45f7.clientY + _45fa - _45fc);
      if(draw2d.Drag.currentTarget != null && _45fd != draw2d.Drag.currentTarget) {
         var _45ff = new draw2d.DragDropEvent();
         _45ff.initDragDropEvent("dragleave", false, oThis);
         draw2d.Drag.currentTarget.dispatchEvent(_45ff);
         }
      if(_45fd != null && _45fd != draw2d.Drag.currentTarget) {
         var _45ff = new draw2d.DragDropEvent();
         _45ff.initDragDropEvent("dragenter", false, oThis);
         _45fd.dispatchEvent(_45ff);
         }
      draw2d.Drag.currentTarget = _45fd;
      if(draw2d.Drag.currentCompartment != null && _45fe != draw2d.Drag.currentCompartment) {
         var _45ff = new draw2d.DragDropEvent();
         _45ff.initDragDropEvent("figureleave", false, oThis);
         draw2d.Drag.currentCompartment.dispatchEvent(_45ff);
         }
      if(_45fe != null && _45fe.node != oThis.node && _45fe != draw2d.Drag.currentCompartment) {
         var _45ff = new draw2d.DragDropEvent();
         _45ff.initDragDropEvent("figureenter", false, oThis);
         _45fe.dispatchEvent(_45ff);
         }
      draw2d.Drag.currentCompartment = _45fe;
      var _4600 = new draw2d.DragDropEvent();
      _4600.initDragDropEvent("drag", false);
      oThis.dispatchEvent(_4600);
      };
   oThis.tempMouseUp = function() {
      oThis.detachEventHandlers();
      var _4601 = arguments[0] || window.event;
      var _4602 = new draw2d.DragDropEvent();
      _4602.initDragDropEvent("dragend", false);
      oThis.dispatchEvent(_4602);
      var _4603 = oThis.node.workflow.getScrollLeft();
      var _4604 = oThis.node.workflow.getScrollTop();
      var _4605 = oThis.node.workflow.getAbsoluteX();
      var _4606 = oThis.node.workflow.getAbsoluteY();
      var _4607 = oThis.getDropTarget(_4601.clientX + _4603 - _4605, _4601.clientY + _4604 - _4606);
      var _4608 = oThis.getCompartment(_4601.clientX + _4603 - _4605, _4601.clientY + _4604 - _4606);
      if(_4607 != null) {
         var _4609 = new draw2d.DragDropEvent();
         _4609.initDragDropEvent("drop", false, oThis);
         _4607.dispatchEvent(_4609);
         }
      if(_4608 != null && _4608.node != oThis.node) {
         var _4609 = new draw2d.DragDropEvent();
         _4609.initDragDropEvent("figuredrop", false, oThis);
         _4608.dispatchEvent(_4609);
         }
      if(draw2d.Drag.currentTarget != null) {
         var _4609 = new draw2d.DragDropEvent();
         _4609.initDragDropEvent("dragleave", false, oThis);
         draw2d.Drag.currentTarget.dispatchEvent(_4609);
         draw2d.Drag.currentTarget = null;
         }
      draw2d.Drag.currentCompartment = null;
      draw2d.Drag.clearCurrent();
      };
   if(document.body.addEventListener) {
      document.body.addEventListener("mousemove", this.tempMouseMove, false);
      document.body.addEventListener("mouseup", this.tempMouseUp, false);
      }
   else {
      if(document.body.attachEvent) {
         document.body.attachEvent("onmousemove", this.tempMouseMove);
         document.body.attachEvent("onmouseup", this.tempMouseUp);
         }
      else {
         throw new Error("Drag doesn't support this browser.");
         }
      }
   };
draw2d.Draggable.prototype.detachEventHandlers = function() {
   this.isAttached = false;
   if(document.body.removeEventListener) {
      document.body.removeEventListener("mousemove", this.tempMouseMove, false);
      document.body.removeEventListener("mouseup", this.tempMouseUp, false);
      }
   else {
      if(document.body.detachEvent) {
         document.body.detachEvent("onmousemove", this.tempMouseMove);
         document.body.detachEvent("onmouseup", this.tempMouseUp);
         }
      else {
         throw new Error("Drag doesn't support this browser.");
         }
      }
   };
draw2d.Draggable.prototype.getDropTarget = function(x, y) {
   for(var i = 0; i < this.targets.getSize(); i++) {
      var _460d = this.targets.get(i);
      if(_460d.node.isOver(x, y) && _460d.node != this.node) {
         return _460d;
         }
      }
   return null;
   };
draw2d.Draggable.prototype.getCompartment = function(x, y) {
   var _4610 = null;
   for(var i = 0; i < this.node.workflow.compartments.getSize(); i++) {
      var _4612 = this.node.workflow.compartments.get(i);
      if(_4612.isOver(x, y) && _4612 != this.node) {
         if(_4610 == null) {
            _4610 = _4612;
            }
         else {
            if(_4610.getZOrder() < _4612.getZOrder()) {
               _4610 = _4612;
               }
            }
         }
      }
   return _4610 == null ? null : _4610.dropable;
   };
draw2d.Draggable.prototype.getLeft = function() {
   return this.element.offsetLeft;
   };
draw2d.Draggable.prototype.getTop = function() {
   return this.element.offsetTop;
   };
draw2d.DragDropEvent = function() {
   draw2d.Event.call(this);
   };
draw2d.DragDropEvent.prototype = new draw2d.Event();
draw2d.DragDropEvent.prototype.initDragDropEvent = function(sType, _4614, _4615) {
   this.initEvent(sType, _4614);
   this.relatedTarget = _4615;
   };
draw2d.DropTarget = function(_4616) {
   draw2d.EventTarget.call(this);
   this.construct(_4616);
   };
draw2d.DropTarget.prototype = new draw2d.EventTarget;
draw2d.DropTarget.prototype.construct = function(_4617) {
   this.element = _4617;
   };
draw2d.DropTarget.prototype.getLeft = function() {
   var el = this.element;
   var ol = el.offsetLeft;
   while((el = el.offsetParent) != null) {
      ol += el.offsetLeft;
      }
   return ol;
   };
draw2d.DropTarget.prototype.getTop = function() {
   var el = this.element;
   var ot = el.offsetTop;
   while((el = el.offsetParent) != null) {
      ot += el.offsetTop;
      }
   return ot;
   };
draw2d.DropTarget.prototype.getHeight = function() {
   return this.element.offsetHeight;
   };
draw2d.DropTarget.prototype.getWidth = function() {
   return this.element.offsetWidth;
   };
draw2d.PositionConstants = function() {
   };
draw2d.PositionConstants.NORTH = 1;
draw2d.PositionConstants.SOUTH = 4;
draw2d.PositionConstants.WEST = 8;
draw2d.PositionConstants.EAST = 16;
draw2d.Color = function(red, green, blue) {
   if(typeof green == "undefined") {
      var rgb = this.hex2rgb(red);
      this.red = rgb[0];
      this.green = rgb[1];
      this.blue = rgb[2];
      }
   else {
      this.red = red;
      this.green = green;
      this.blue = blue;
      }
   };
draw2d.Color.prototype.type = "Color";
draw2d.Color.prototype.getHTMLStyle = function() {
   return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
   };
draw2d.Color.prototype.getRed = function() {
   return this.red;
   };
draw2d.Color.prototype.getGreen = function() {
   return this.green;
   };
draw2d.Color.prototype.getBlue = function() {
   return this.blue;
   };
draw2d.Color.prototype.getIdealTextColor = function() {
   var _47d4 = 105;
   var _47d5 = (this.red * 0.299) + (this.green * 0.587) + (this.blue * 0.114);
   return (255 - _47d5 < _47d4) ? new draw2d.Color(0, 0, 0) : new draw2d.Color(255, 255, 255);
   };
draw2d.Color.prototype.hex2rgb = function(_47d6) {
   _47d6 = _47d6.replace("#", "");
   return ( {
      0 : parseInt(_47d6.substr(0, 2), 16), 1 : parseInt(_47d6.substr(2, 2), 16), 2 : parseInt(_47d6.substr(4, 2), 16)}
   );
   };
draw2d.Color.prototype.hex = function() {
   return (this.int2hex(this.red) + this.int2hex(this.green) + this.int2hex(this.blue));
   };
draw2d.Color.prototype.int2hex = function(v) {
   v = Math.round(Math.min(Math.max(0, v), 255));
   return ("0123456789ABCDEF".charAt((v - v % 16) / 16) + "0123456789ABCDEF".charAt(v % 16));
   };
draw2d.Color.prototype.darker = function(_47d8) {
   var red = parseInt(Math.round(this.getRed() * (1 - _47d8)));
   var green = parseInt(Math.round(this.getGreen() * (1 - _47d8)));
   var blue = parseInt(Math.round(this.getBlue() * (1 - _47d8)));
   if(red < 0) {
      red = 0;
      }
   else {
      if(red > 255) {
         red = 255;
         }
      }
   if(green < 0) {
      green = 0;
      }
   else {
      if(green > 255) {
         green = 255;
         }
      }
   if(blue < 0) {
      blue = 0;
      }
   else {
      if(blue > 255) {
         blue = 255;
         }
      }
   return new draw2d.Color(red, green, blue);
   };
draw2d.Color.prototype.lighter = function(_47dc) {
   var red = parseInt(Math.round(this.getRed() * (1 + _47dc)));
   var green = parseInt(Math.round(this.getGreen() * (1 + _47dc)));
   var blue = parseInt(Math.round(this.getBlue() * (1 + _47dc)));
   if(red < 0) {
      red = 0;
      }
   else {
      if(red > 255) {
         red = 255;
         }
      }
   if(green < 0) {
      green = 0;
      }
   else {
      if(green > 255) {
         green = 255;
         }
      }
   if(blue < 0) {
      blue = 0;
      }
   else {
      if(blue > 255) {
         blue = 255;
         }
      }
   return new draw2d.Color(red, green, blue);
   };
draw2d.Point = function(x, y) {
   this.x = x;
   this.y = y;
   };
draw2d.Point.prototype.type = "Point";
draw2d.Point.prototype.getX = function() {
   return this.x;
   };
draw2d.Point.prototype.getY = function() {
   return this.y;
   };
draw2d.Point.prototype.getPosition = function(p) {
   var dx = p.x - this.x;
   var dy = p.y - this.y;
   if(Math.abs(dx) > Math.abs(dy)) {
      if(dx < 0) {
         return draw2d.PositionConstants.WEST;
         }
      return draw2d.PositionConstants.EAST;
      }
   if(dy < 0) {
      return draw2d.PositionConstants.NORTH;
      }
   return draw2d.PositionConstants.SOUTH;
   };
draw2d.Point.prototype.equals = function(o) {
   return this.x == o.x && this.y == o.y;
   };
draw2d.Point.prototype.getDistance = function(other) {
   return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
   };
draw2d.Point.prototype.getTranslated = function(other) {
   return new draw2d.Point(this.x + other.x, this.y + other.y);
   };
draw2d.Dimension = function(x, y, w, h) {
   draw2d.Point.call(this, x, y);
   this.w = w;
   this.h = h;
   };
draw2d.Dimension.prototype = new draw2d.Point;
draw2d.Dimension.prototype.type = "Dimension";
draw2d.Dimension.prototype.translate = function(dx, dy) {
   this.x += dx;
   this.y += dy;
   return this;
   };
draw2d.Dimension.prototype.resize = function(dw, dh) {
   this.w += dw;
   this.h += dh;
   return this;
   };
draw2d.Dimension.prototype.setBounds = function(rect) {
   this.x = rect.x;
   this.y = rect.y;
   this.w = rect.w;
   this.h = rect.h;
   return this;
   };
draw2d.Dimension.prototype.isEmpty = function() {
   return this.w <= 0 || this.h <= 0;
   };
draw2d.Dimension.prototype.getWidth = function() {
   return this.w;
   };
draw2d.Dimension.prototype.getHeight = function() {
   return this.h;
   };
draw2d.Dimension.prototype.getRight = function() {
   return this.x + this.w;
   };
draw2d.Dimension.prototype.getBottom = function() {
   return this.y + this.h;
   };
draw2d.Dimension.prototype.getTopLeft = function() {
   return new draw2d.Point(this.x, this.y);
   };
draw2d.Dimension.prototype.getCenter = function() {
   return new draw2d.Point(this.x + this.w / 2, this.y + this.h / 2);
   };
draw2d.Dimension.prototype.getBottomRight = function() {
   return new draw2d.Point(this.x + this.w, this.y + this.h);
   };
draw2d.Dimension.prototype.equals = function(o) {
   return this.x == o.x && this.y == o.y && this.w == o.w && this.h == o.h;
   };
draw2d.SnapToHelper = function(_499d) {
   this.workflow = _499d;
   };
draw2d.SnapToHelper.NORTH = 1;
draw2d.SnapToHelper.SOUTH = 4;
draw2d.SnapToHelper.WEST = 8;
draw2d.SnapToHelper.EAST = 16;
draw2d.SnapToHelper.NORTH_EAST = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.NORTH_WEST = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.SOUTH_EAST = draw2d.SnapToHelper.SOUTH | draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.SOUTH_WEST = draw2d.SnapToHelper.SOUTH | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NORTH_SOUTH = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.SOUTH;
draw2d.SnapToHelper.EAST_WEST = draw2d.SnapToHelper.EAST | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NSEW = draw2d.SnapToHelper.NORTH_SOUTH | draw2d.SnapToHelper.EAST_WEST;
draw2d.SnapToHelper.prototype.snapPoint = function(_499e, _499f, _49a0) {
   return _499f;
   };
draw2d.SnapToHelper.prototype.snapRectangle = function(_49a1, _49a2) {
   return _49a1;
   };
draw2d.SnapToHelper.prototype.onSetDocumentDirty = function() {
   };
draw2d.SnapToGrid = function(_4a93) {
   draw2d.SnapToHelper.call(this, _4a93);
   };
draw2d.SnapToGrid.prototype = new draw2d.SnapToHelper;
draw2d.SnapToGrid.prototype.snapPoint = function(_4a94, _4a95, _4a96) {
   _4a96.x = this.workflow.gridWidthX * Math.floor(((_4a95.x + this.workflow.gridWidthX / 2) / this.workflow.gridWidthX));
   _4a96.y = this.workflow.gridWidthY * Math.floor(((_4a95.y + this.workflow.gridWidthY / 2) / this.workflow.gridWidthY));
   return 0;
   };
draw2d.SnapToGrid.prototype.snapRectangle = function(_4a97, _4a98) {
   _4a98.x = _4a97.x;
   _4a98.y = _4a97.y;
   _4a98.w = _4a97.w;
   _4a98.h = _4a97.h;
   return 0;
   };
draw2d.SnapToGeometryEntry = function(type, _53e9) {
   this.type = type;
   this.location = _53e9;
   };
draw2d.SnapToGeometryEntry.prototype.getLocation = function() {
   return this.location;
   };
draw2d.SnapToGeometryEntry.prototype.getType = function() {
   return this.type;
   };
draw2d.SnapToGeometry = function(_4788) {
   draw2d.SnapToHelper.call(this, _4788);
   };
draw2d.SnapToGeometry.prototype = new draw2d.SnapToHelper;
draw2d.SnapToGeometry.THRESHOLD = 5;
draw2d.SnapToGeometry.prototype.snapPoint = function(_4789, _478a, _478b) {
   if(this.rows == null || this.cols == null) {
      this.populateRowsAndCols();
      }
   if((_4789 & draw2d.SnapToHelper.EAST) != 0) {
      var _478c = this.getCorrectionFor(this.cols, _478a.getX() - 1, 1);
      if(_478c != draw2d.SnapToGeometry.THRESHOLD) {
         _4789 &= ~draw2d.SnapToHelper.EAST;
         _478b.x += _478c;
         }
      }
   if((_4789 & draw2d.SnapToHelper.WEST) != 0) {
      var _478d = this.getCorrectionFor(this.cols, _478a.getX(), - 1);
      if(_478d != draw2d.SnapToGeometry.THRESHOLD) {
         _4789 &= ~draw2d.SnapToHelper.WEST;
         _478b.x += _478d;
         }
      }
   if((_4789 & draw2d.SnapToHelper.SOUTH) != 0) {
      var _478e = this.getCorrectionFor(this.rows, _478a.getY() - 1, 1);
      if(_478e != draw2d.SnapToGeometry.THRESHOLD) {
         _4789 &= ~draw2d.SnapToHelper.SOUTH;
         _478b.y += _478e;
         }
      }
   if((_4789 & draw2d.SnapToHelper.NORTH) != 0) {
      var _478f = this.getCorrectionFor(this.rows, _478a.getY(), - 1);
      if(_478f != draw2d.SnapToGeometry.THRESHOLD) {
         _4789 &= ~draw2d.SnapToHelper.NORTH;
         _478b.y += _478f;
         }
      }
   return _4789;
   };
draw2d.SnapToGeometry.prototype.snapRectangle = function(_4790, _4791) {
   var _4792 = _4790.getTopLeft();
   var _4793 = _4790.getBottomRight();
   var _4794 = this.snapPoint(draw2d.SnapToHelper.NORTH_WEST, _4790.getTopLeft(), _4792);
   _4791.x = _4792.x;
   _4791.y = _4792.y;
   var _4795 = this.snapPoint(draw2d.SnapToHelper.SOUTH_EAST, _4790.getBottomRight(), _4793);
   if(_4794 & draw2d.SnapToHelper.WEST) {
      _4791.x = _4793.x - _4790.getWidth();
      }
   if(_4794 & draw2d.SnapToHelper.NORTH) {
      _4791.y = _4793.y - _4790.getHeight();
      }
   return _4794 | _4795;
   };
draw2d.SnapToGeometry.prototype.populateRowsAndCols = function() {
   this.rows = new Array();
   this.cols = new Array();
   var _4796 = this.workflow.getDocument().getFigures();
   var index = 0;
   for(var i = 0; i < _4796.getSize(); i++) {
      var _4799 = _4796.get(i);
      if(_4799 != this.workflow.getCurrentSelection()) {
         var _479a = _4799.getBounds();
         this.cols[index * 3] = new draw2d.SnapToGeometryEntry( - 1, _479a.getX());
         this.rows[index * 3] = new draw2d.SnapToGeometryEntry( - 1, _479a.getY());
         this.cols[index * 3 + 1] = new draw2d.SnapToGeometryEntry(0, _479a.x + (_479a.getWidth() - 1) / 2);
         this.rows[index * 3 + 1] = new draw2d.SnapToGeometryEntry(0, _479a.y + (_479a.getHeight() - 1) / 2);
         this.cols[index * 3 + 2] = new draw2d.SnapToGeometryEntry(1, _479a.getRight() - 1);
         this.rows[index * 3 + 2] = new draw2d.SnapToGeometryEntry(1, _479a.getBottom() - 1);
         index++;
         }
      }
   };
draw2d.SnapToGeometry.prototype.getCorrectionFor = function(_479b, value, side) {
   var _479e = draw2d.SnapToGeometry.THRESHOLD;
   var _479f = draw2d.SnapToGeometry.THRESHOLD;
   for(var i = 0; i < _479b.length; i++) {
      var entry = _479b[i];
      var _47a2;
      if(entry.type ==- 1 && side != 0) {
         _47a2 = Math.abs(value - entry.location);
         if(_47a2 < _479e) {
            _479e = _47a2;
            _479f = entry.location - value;
            }
         }
      else {
         if(entry.type == 0 && side == 0) {
            _47a2 = Math.abs(value - entry.location);
            if(_47a2 < _479e) {
               _479e = _47a2;
               _479f = entry.location - value;
               }
            }
         else {
            if(entry.type == 1 && side != 0) {
               _47a2 = Math.abs(value - entry.location);
               if(_47a2 < _479e) {
                  _479e = _47a2;
                  _479f = entry.location - value;
                  }
               }
            }
         }
      }
   return _479f;
   };
draw2d.SnapToGeometry.prototype.onSetDocumentDirty = function() {
   this.rows = null;
   this.cols = null;
   };
draw2d.Border = function() {
   this.color = null;
   };
draw2d.Border.prototype.type = "Border";
draw2d.Border.prototype.dispose = function() {
   this.color = null;
   };
draw2d.Border.prototype.getHTMLStyle = function() {
   return "";
   };
draw2d.Border.prototype.setColor = function(c) {
   this.color = c;
   };
draw2d.Border.prototype.getColor = function() {
   return this.color;
   };
draw2d.Border.prototype.refresh = function() {
   };
draw2d.LineBorder = function(width) {
   draw2d.Border.call(this);
   this.width = 1;
   if(width) {
      this.width = width;
      }
   this.figure = null;
   };
draw2d.LineBorder.prototype = new draw2d.Border;
draw2d.LineBorder.prototype.type = "LineBorder";
draw2d.LineBorder.prototype.dispose = function() {
   draw2d.Border.prototype.dispose.call(this);
   this.figure = null;
   };
draw2d.LineBorder.prototype.setLineWidth = function(w) {
   this.width = w;
   if(this.figure != null) {
      this.figure.html.style.border = this.getHTMLStyle();
      }
   };
draw2d.LineBorder.prototype.getHTMLStyle = function() {
   if(this.getColor() != null) {
      return this.width + "px solid " + this.getColor().getHTMLStyle();
      }
   return this.width + "px solid black";
   };
draw2d.LineBorder.prototype.refresh = function() {
   this.setLineWidth(this.width);
   };
draw2d.Figure = function() {
   this.construct();
   };
draw2d.Figure.prototype.type = "Figure";
draw2d.Figure.ZOrderBaseIndex = 100;
draw2d.Figure.setZOrderBaseIndex = function(index) {
   draw2d.Figure.ZOrderBaseIndex = index;
   };
draw2d.Figure.prototype.construct = function() {
   this.lastDragStartTime = 0;
   this.x = 0;
   this.y = 0;
   this.border = null;
   this.setDimension(10, 10);
   this.id = this.generateUId();
   this.html = this.createHTMLElement();
   this.canvas = null;
   this.workflow = null;
   this.draggable = null;
   this.parent = null;
   this.isMoving = false;
   this.canSnapToHelper = true;
   this.snapToGridAnchor = new draw2d.Point(0, 0);
   this.timer =- 1;
   this.setDeleteable(true);
   this.setCanDrag(true);
   this.setResizeable(true);
   this.setSelectable(true);
   this.properties = new Object();
   this.moveListener = new draw2d.ArrayList();
   };
draw2d.Figure.prototype.dispose = function() {
   this.canvas = null;
   this.workflow = null;
   this.moveListener = null;
   if(this.draggable != null) {
      this.draggable.removeEventListener("mouseenter", this.tmpMouseEnter);
      this.draggable.removeEventListener("mouseleave", this.tmpMouseLeave);
      this.draggable.removeEventListener("dragend", this.tmpDragend);
      this.draggable.removeEventListener("dragstart", this.tmpDragstart);
      this.draggable.removeEventListener("drag", this.tmpDrag);
      this.draggable.removeEventListener("dblclick", this.tmpDoubleClick);
      this.draggable.node = null;
      }
   this.draggable = null;
   if(this.border != null) {
      this.border.dispose();
      }
   this.border = null;
   if(this.parent != null) {
      this.parent.removeChild(this);
      }
   };
draw2d.Figure.prototype.getProperties = function() {
   return this.properties;
   };
draw2d.Figure.prototype.getProperty = function(key) {
   return this.properties[key];
   };
draw2d.Figure.prototype.setProperty = function(key, value) {
   this.properties[key] = value;
   this.setDocumentDirty();
   };
draw2d.Figure.prototype.getId = function() {
   return this.id;
   };
draw2d.Figure.prototype.setCanvas = function(_5365) {
   this.canvas = _5365;
   };
draw2d.Figure.prototype.getWorkflow = function() {
   return this.workflow;
   };
draw2d.Figure.prototype.setWorkflow = function(_5366) {
   if(this.draggable == null) {
      this.html.tabIndex = "0";
      var oThis = this;
      this.keyDown = function(event) {
         event.cancelBubble = true;
         event.returnValue = true;
         oThis.onKeyDown(event.keyCode, event.ctrlKey);
         };
      if(this.html.addEventListener) {
         this.html.addEventListener("keydown", this.keyDown, false);
         }
      else {
         if(this.html.attachEvent) {
            this.html.attachEvent("onkeydown", this.keyDown);
            }
         }
      this.draggable = new draw2d.Draggable(this.html, draw2d.Draggable.DRAG_X | draw2d.Draggable.DRAG_Y);
      this.draggable.node = this;
      this.tmpContextMenu = function(_5369) {
         oThis.onContextMenu(oThis.x + _5369.x, _5369.y + oThis.y);
         };
      this.tmpMouseEnter = function(_536a) {
         oThis.onMouseEnter();
         };
      this.tmpMouseLeave = function(_536b) {
         oThis.onMouseLeave();
         };
      this.tmpDragend = function(_536c) {
         oThis.onDragend();
         };
      this.tmpDragstart = function(_536d) {
         var w = oThis.workflow;
         w.showMenu(null);
         if(oThis.workflow.toolPalette && oThis.workflow.toolPalette.activeTool) {
            _536d.returnValue = false;
            oThis.workflow.onMouseDown(oThis.x + _536d.x, _536d.y + oThis.y);
            oThis.workflow.onMouseUp(oThis.x + _536d.x, _536d.y + oThis.y);
            return;
            }
         _536d.returnValue = oThis.onDragstart(_536d.x, _536d.y);
         };
      this.tmpDrag = function(_536f) {
         oThis.onDrag();
         };
      this.tmpDoubleClick = function(_5370) {
         oThis.onDoubleClick();
         };
      this.draggable.addEventListener("contextmenu", this.tmpContextMenu);
      this.draggable.addEventListener("mouseenter", this.tmpMouseEnter);
      this.draggable.addEventListener("mouseleave", this.tmpMouseLeave);
      this.draggable.addEventListener("dragend", this.tmpDragend);
      this.draggable.addEventListener("dragstart", this.tmpDragstart);
      this.draggable.addEventListener("drag", this.tmpDrag);
      this.draggable.addEventListener("dblclick", this.tmpDoubleClick);
      }
   this.workflow = _5366;
   };
draw2d.Figure.prototype.createHTMLElement = function() {
   var item = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   item.id = this.id;
   item.style.position = "absolute";
   item.style.left = this.x + "px";
   item.style.top = this.y + "px";
   item.style.height = this.width + "px";
   item.style.width = this.height + "px";
   item.style.margin = "0px";
   item.style.padding = "0px";
   item.style.outline = "none";
   item.style.zIndex = "" + draw2d.Figure.ZOrderBaseIndex;
   return item;
   };
draw2d.Figure.prototype.setParent = function(_5372) {
   this.parent = _5372;
   };
draw2d.Figure.prototype.getParent = function() {
   return this.parent;
   };
draw2d.Figure.prototype.getZOrder = function() {
   return this.html.style.zIndex;
   };
draw2d.Figure.prototype.setZOrder = function(index) {
   this.html.style.zIndex = index;
   };
draw2d.Figure.prototype.hasFixedPosition = function() {
   return false;
   };
draw2d.Figure.prototype.getMinWidth = function() {
   return 5;
   };
draw2d.Figure.prototype.getMinHeight = function() {
   return 5;
   };
draw2d.Figure.prototype.getHTMLElement = function() {
   if(this.html == null) {
      this.html = this.createHTMLElement();
      }
   return this.html;
   };
draw2d.Figure.prototype.paint = function() {
   };
draw2d.Figure.prototype.setBorder = function(_5374) {
   if(this.border != null) {
      this.border.figure = null;
      }
   this.border = _5374;
   this.border.figure = this;
   this.border.refresh();
   this.setDocumentDirty();
   };
draw2d.Figure.prototype.onContextMenu = function(x, y) {
   var menu = this.getContextMenu();
   if(menu != null) {
      this.workflow.showMenu(menu, x, y);
      }
   };
draw2d.Figure.prototype.getContextMenu = function() {
   return null;
   };
draw2d.Figure.prototype.onDoubleClick = function() {
   };
draw2d.Figure.prototype.onMouseEnter = function() {
   };
draw2d.Figure.prototype.onMouseLeave = function() {
   };
draw2d.Figure.prototype.onDrag = function() {
   this.x = this.draggable.getLeft();
   this.y = this.draggable.getTop();
   if(this.isMoving == false) {
      this.isMoving = true;
      this.setAlpha(0.5);
      }
   this.fireMoveEvent();
   };
draw2d.Figure.prototype.onDragend = function() {
   if(this.getWorkflow().getEnableSmoothFigureHandling() == true) {
      var _5378 = this;
      var _5379 = function() {
         if(_5378.alpha < 1) {
            _5378.setAlpha(Math.min(1, _5378.alpha + 0.05));
            }
         else {
            window.clearInterval(_5378.timer);
            _5378.timer =- 1;
            }
         };
      if(_5378.timer > 0) {
         window.clearInterval(_5378.timer);
         }
      _5378.timer = window.setInterval(_5379, 20);
      }
   else {
      this.setAlpha(1);
      }
   this.command.setPosition(this.x, this.y);
   this.workflow.commandStack.execute(this.command);
   this.command = null;
   this.isMoving = false;
   this.workflow.hideSnapToHelperLines();
   this.fireMoveEvent();
   };
draw2d.Figure.prototype.onDragstart = function(x, y) {
   if(!this.canDrag) {
      return false;
      }
   this.command = new draw2d.CommandMove(this, this.x, this.y);
   return true;
   };
draw2d.Figure.prototype.setCanDrag = function(flag) {
   this.canDrag = flag;
   if(flag) {
      this.html.style.cursor = "move";
      }
   else {
      this.html.style.cursor = null;
      }
   };
draw2d.Figure.prototype.setAlpha = function(_537d) {
   if(this.alpha == _537d) {
      return;
      }
   try {
      this.html.style.MozOpacity = _537d;
      }
   catch(exc) {
      }
   try {
      this.html.style.opacity = _537d;
      }
   catch(exc) {
      }
   try {
      var _537e = Math.round(_537d * 100);
      if(_537e >= 99) {
         this.html.style.filter = "";
         }
      else {
         this.html.style.filter = "alpha(opacity=" + _537e + ")";
         }
      }
   catch(exc) {
      }
   this.alpha = _537d;
   };
draw2d.Figure.prototype.setDimension = function(w, h) {
   this.width = Math.max(this.getMinWidth(), w);
   this.height = Math.max(this.getMinHeight(), h);
   if(this.html == null) {
      return;
      }
   this.html.style.width = this.width + "px";
   this.html.style.height = this.height + "px";
   this.fireMoveEvent();
   if(this.workflow != null && this.workflow.getCurrentSelection() == this) {
      this.workflow.showResizeHandles(this);
      }
   };
draw2d.Figure.prototype.setPosition = function(xPos, yPos) {
   this.x = xPos;
   this.y = yPos;
   if(this.html == null) {
      return;
      }
   this.html.style.left = this.x + "px";
   this.html.style.top = this.y + "px";
   this.fireMoveEvent();
   if(this.workflow != null && this.workflow.getCurrentSelection() == this) {
      this.workflow.showResizeHandles(this);
      }
   };
draw2d.Figure.prototype.isResizeable = function() {
   return this.resizeable;
   };
draw2d.Figure.prototype.setResizeable = function(flag) {
   this.resizeable = flag;
   };
draw2d.Figure.prototype.isSelectable = function() {
   return this.selectable;
   };
draw2d.Figure.prototype.setSelectable = function(flag) {
   this.selectable = flag;
   };
draw2d.Figure.prototype.isStrechable = function() {
   return true;
   };
draw2d.Figure.prototype.isDeleteable = function() {
   return this.deleteable;
   };
draw2d.Figure.prototype.setDeleteable = function(flag) {
   this.deleteable = flag;
   };
draw2d.Figure.prototype.setCanSnapToHelper = function(flag) {
   this.canSnapToHelper = flag;
   };
draw2d.Figure.prototype.getCanSnapToHelper = function() {
   return this.canSnapToHelper;
   };
draw2d.Figure.prototype.getSnapToGridAnchor = function() {
   return this.snapToGridAnchor;
   };
draw2d.Figure.prototype.setSnapToGridAnchor = function(point) {
   this.snapToGridAnchor = point;
   };
draw2d.Figure.prototype.getBounds = function() {
   return new draw2d.Dimension(this.getX(), this.getY(), this.getWidth(), this.getHeight());
   };
draw2d.Figure.prototype.getWidth = function() {
   return this.width;
   };
draw2d.Figure.prototype.getHeight = function() {
   return this.height;
   };
draw2d.Figure.prototype.getY = function() {
   return this.y;
   };
draw2d.Figure.prototype.getX = function() {
   return this.x;
   };
draw2d.Figure.prototype.getAbsoluteY = function() {
   return this.y;
   };
draw2d.Figure.prototype.getAbsoluteX = function() {
   return this.x;
   };
draw2d.Figure.prototype.onKeyDown = function(_5388, ctrl) {
   if(_5388 == 46 && this.isDeleteable() == true) {
      this.workflow.commandStack.execute(new draw2d.CommandDelete(this));
      }
   if(ctrl) {
      this.workflow.onKeyDown(_5388, ctrl);
      }
   };
draw2d.Figure.prototype.getPosition = function() {
   return new draw2d.Point(this.x, this.y);
   };
draw2d.Figure.prototype.isOver = function(iX, iY) {
   var x = this.getAbsoluteX();
   var y = this.getAbsoluteY();
   var iX2 = x + this.width;
   var iY2 = y + this.height;
   return (iX >= x && iX <= iX2 && iY >= y && iY <= iY2);
   };
draw2d.Figure.prototype.attachMoveListener = function(_5390) {
   if(_5390 == null || this.moveListener == null) {
      return;
      }
   this.moveListener.add(_5390);
   };
draw2d.Figure.prototype.detachMoveListener = function(_5391) {
   if(_5391 == null || this.moveListener == null) {
      return;
      }
   this.moveListener.remove(_5391);
   };
draw2d.Figure.prototype.fireMoveEvent = function() {
   this.setDocumentDirty();
   var size = this.moveListener.getSize();
   for(var i = 0; i < size; i++) {
      this.moveListener.get(i).onOtherFigureMoved(this);
      }
   };
draw2d.Figure.prototype.onOtherFigureMoved = function(_5394) {
   };
draw2d.Figure.prototype.setDocumentDirty = function() {
   if(this.workflow != null) {
      this.workflow.setDocumentDirty();
      }
   };
draw2d.Figure.prototype.generateUId = function() {
   var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
   var _5396 = 10;
   var _5397 = 10;
   nbTry = 0;
   while(nbTry < 1000) {
      var id = "";
      for(var i = 0; i < _5396; i++) {
         var rnum = Math.floor(Math.random() * chars.length);
         id += chars.substring(rnum, rnum + 1);
         }
      elem = document.getElementById(id);
      if(!elem) {
         return id;
         }
      nbTry += 1;
      }
   return null;
   };
draw2d.Figure.prototype.disableTextSelection = function(e) {
   if(typeof e.onselectstart != "undefined") {
      e.onselectstart = function() {
         return false;
         };
      }
   else {
      if(typeof e.style.MozUserSelect != "undefined") {
         e.style.MozUserSelect = "none";
         }
      }
   };
draw2d.Node = function() {
   this.bgColor = null;
   this.lineColor = new draw2d.Color(128, 128, 255);
   this.lineStroke = 1;
   this.ports = new draw2d.ArrayList();
   draw2d.Figure.call(this);
   };
draw2d.Node.prototype = new draw2d.Figure;
draw2d.Node.prototype.type = "Node";
draw2d.Node.prototype.dispose = function() {
   for(var i = 0; i < this.ports.getSize(); i++) {
      this.ports.get(i).dispose();
      }
   this.ports = null;
   draw2d.Figure.prototype.dispose.call(this);
   };
draw2d.Node.prototype.createHTMLElement = function() {
   var item = draw2d.Figure.prototype.createHTMLElement.call(this);
   item.style.width = "auto";
   item.style.height = "auto";
   item.style.margin = "0px";
   item.style.padding = "0px";
   if(this.lineColor != null) {
      item.style.border = this.lineStroke + "px solid " + this.lineColor.getHTMLStyle();
      }
   item.style.fontSize = "1px";
   if(this.bgColor != null) {
      item.style.backgroundColor = this.bgColor.getHTMLStyle();
      }
   return item;
   };
draw2d.Node.prototype.paint = function() {
   draw2d.Figure.prototype.paint.call(this);
   for(var i = 0; i < this.ports.getSize(); i++) {
      this.ports.get(i).paint();
      }
   };
draw2d.Node.prototype.getPorts = function() {
   return this.ports;
   };
draw2d.Node.prototype.getPort = function(_42e5) {
   if(this.ports == null) {
      return null;
      }
   for(var i = 0; i < this.ports.getSize(); i++) {
      var port = this.ports.get(i);
      if(port.getName() == _42e5) {
         return port;
         }
      }
   };
draw2d.Node.prototype.addPort = function(port, x, y) {
   this.ports.add(port);
   port.setOrigin(x, y);
   port.setPosition(x, y);
   port.setParent(this);
   port.setDeleteable(false);
   this.html.appendChild(port.getHTMLElement());
   if(this.workflow != null) {
      this.workflow.registerPort(port);
      }
   };
draw2d.Node.prototype.removePort = function(port) {
   if(this.ports != null) {
      this.ports.removeElementAt(this.ports.indexOf(port));
      }
   try {
      this.html.removeChild(port.getHTMLElement());
      }
   catch(exc) {
      }
   if(this.workflow != null) {
      this.workflow.unregisterPort(port);
      }
   };
draw2d.Node.prototype.setWorkflow = function(_42ec) {
   var _42ed = this.workflow;
   draw2d.Figure.prototype.setWorkflow.call(this, _42ec);
   if(_42ed != null) {
      for(var i = 0; i < this.ports.getSize(); i++) {
         _42ed.unregisterPort(this.ports.get(i));
         }
      }
   if(this.workflow != null) {
      for(var i = 0; i < this.ports.getSize(); i++) {
         this.workflow.registerPort(this.ports.get(i));
         }
      }
   };
draw2d.Node.prototype.setBackgroundColor = function(color) {
   this.bgColor = color;
   if(this.bgColor != null) {
      this.html.style.backgroundColor = this.bgColor.getHTMLStyle();
      }
   else {
      this.html.style.backgroundColor = "transparent";
      }
   };
draw2d.Node.prototype.getBackgroundColor = function() {
   return this.bgColor;
   };
draw2d.Node.prototype.setColor = function(color) {
   this.lineColor = color;
   if(this.lineColor != null) {
      this.html.style.border = this.lineStroke + "px solid " + this.lineColor.getHTMLStyle();
      }
   else {
      this.html.style.border = "0px";
      }
   };
draw2d.Node.prototype.setLineWidth = function(w) {
   this.lineStroke = w;
   if(this.lineColor != null) {
      this.html.style.border = this.lineStroke + "px solid " + this.lineColor.getHTMLStyle();
      }
   else {
      this.html.style.border = "0px";
      }
   };
draw2d.VectorFigure = function() {
   this.bgColor = null;
   this.lineColor = new draw2d.Color(0, 0, 0);
   this.stroke = 1;
   this.graphics = null;
   draw2d.Node.call(this);
   };
draw2d.VectorFigure.prototype = new draw2d.Node;
draw2d.VectorFigure.prototype.type = "VectorFigure";
draw2d.VectorFigure.prototype.dispose = function() {
   draw2d.Node.prototype.dispose.call(this);
   this.bgColor = null;
   this.lineColor = null;
   if(this.graphics != null) {
      this.graphics.clear();
      }
   this.graphics = null;
   };
draw2d.VectorFigure.prototype.createHTMLElement = function() {
   var item = draw2d.Node.prototype.createHTMLElement.call(this);
   item.style.border = "0px";
   item.style.backgroundColor = "transparent";
   return item;
   };
draw2d.VectorFigure.prototype.setWorkflow = function(_575f) {
   draw2d.Node.prototype.setWorkflow.call(this, _575f);
   if(this.workflow == null) {
      this.graphics.clear();
      this.graphics = null;
      }
   };
draw2d.VectorFigure.prototype.paint = function() {
   if(this.graphics == null) {
      this.graphics = new jsGraphics(this.id);
      }
   else {
      this.graphics.clear();
      }
   draw2d.Node.prototype.paint.call(this);
   for(var i = 0; i < this.ports.getSize(); i++) {
      this.getHTMLElement().appendChild(this.ports.get(i).getHTMLElement());
      }
   };
draw2d.VectorFigure.prototype.setDimension = function(w, h) {
   draw2d.Node.prototype.setDimension.call(this, w, h);
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.VectorFigure.prototype.setBackgroundColor = function(color) {
   this.bgColor = color;
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.VectorFigure.prototype.getBackgroundColor = function() {
   return this.bgColor;
   };
draw2d.VectorFigure.prototype.setLineWidth = function(w) {
   this.stroke = w;
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.VectorFigure.prototype.setColor = function(color) {
   this.lineColor = color;
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.VectorFigure.prototype.getColor = function() {
   return this.lineColor;
   };
draw2d.SVGFigure = function(width, _58ee) {
   this.bgColor = null;
   this.lineColor = new draw2d.Color(0, 0, 0);
   this.stroke = 1;
   this.context = null;
   draw2d.Node.call(this);
   if(width && _58ee) {
      this.setDimension(width, _58ee);
      }
   };
draw2d.SVGFigure.prototype = new draw2d.Node;
draw2d.SVGFigure.prototype.type = "SVGFigure";
draw2d.SVGFigure.prototype.createHTMLElement = function() {
   var item = new MooCanvas(this.id, {
      width : this.getWidth(), height : this.getHeight()}
   );
   item.style.position = "absolute";
   item.style.left = this.x + "px";
   item.style.top = this.y + "px";
   item.style.zIndex = "" + draw2d.Figure.ZOrderBaseIndex;
   this.context = item.getContext("2d");
   return item;
   };
draw2d.SVGFigure.prototype.paint = function() {
   this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
   this.context.fillStyle = "rgba(200,0,0,0.3)";
   this.context.fillRect(0, 0, this.getWidth(), this.getHeight());
   };
draw2d.SVGFigure.prototype.setDimension = function(w, h) {
   draw2d.Node.prototype.setDimension.call(this, w, h);
   this.html.width = w;
   this.html.height = h;
   if(this.context != null) {
      this.paint();
      }
   };
draw2d.SVGFigure.prototype.setBackgroundColor = function(color) {
   this.bgColor = color;
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.SVGFigure.prototype.getBackgroundColor = function() {
   return this.bgColor;
   };
draw2d.SVGFigure.prototype.setLineWidth = function(w) {
   this.stroke = w;
   if(this.context != null) {
      this.paint();
      }
   };
draw2d.SVGFigure.prototype.setColor = function(color) {
   this.lineColor = color;
   if(this.context != null) {
      this.paint();
      }
   };
draw2d.SVGFigure.prototype.getColor = function() {
   return this.lineColor;
   };
draw2d.Label = function(msg) {
   this.msg = msg;
   this.bgColor = null;
   this.color = new draw2d.Color(0, 0, 0);
   this.fontSize = 10;
   this.textNode = null;
   this.align = "center";
   draw2d.Figure.call(this);
   };
draw2d.Label.prototype = new draw2d.Figure;
draw2d.Label.prototype.type = "Label";
draw2d.Label.prototype.createHTMLElement = function() {
   var item = draw2d.Figure.prototype.createHTMLElement.call(this);
   this.textNode = document.createTextNode(this.msg);
   item.appendChild(this.textNode);
   item.style.color = this.color.getHTMLStyle();
   item.style.fontSize = this.fontSize + "pt";
   item.style.width = "auto";
   item.style.height = "auto";
   item.style.paddingLeft = "3px";
   item.style.paddingRight = "3px";
   item.style.textAlign = this.align;
   if(this.bgColor != null) {
      item.style.backgroundColor = this.bgColor.getHTMLStyle();
      }
   return item;
   };
draw2d.Label.prototype.isResizeable = function() {
   return false;
   };
draw2d.Label.prototype.setWordwrap = function(flag) {
   this.html.style.whiteSpace = flag ? "wrap" : "nowrap";
   };
draw2d.Label.prototype.setAlign = function(align) {
   this.align = align;
   this.html.style.textAlign = align;
   };
draw2d.Label.prototype.setBackgroundColor = function(color) {
   this.bgColor = color;
   if(this.bgColor != null) {
      this.html.style.backgroundColor = this.bgColor.getHTMLStyle();
      }
   else {
      this.html.style.backgroundColor = "transparent";
      }
   };
draw2d.Label.prototype.setColor = function(color) {
   this.color = color;
   this.html.style.color = this.color.getHTMLStyle();
   };
draw2d.Label.prototype.setFontSize = function(size) {
   this.fontSize = size;
   this.html.style.fontSize = this.fontSize + "pt";
   };
draw2d.Label.prototype.getWidth = function() {
   if(window.getComputedStyle) {
      return parseInt(getComputedStyle(this.html, "").getPropertyValue("width"));
      }
   return parseInt(this.html.clientWidth);
   };
draw2d.Label.prototype.getHeight = function() {
   if(window.getComputedStyle) {
      return parseInt(getComputedStyle(this.html, "").getPropertyValue("height"));
      }
   return parseInt(this.html.clientHeight);
   };
draw2d.Label.prototype.getText = function() {
   this.msg = text;
   };
draw2d.Label.prototype.setText = function(text) {
   this.msg = text;
   this.html.removeChild(this.textNode);
   this.textNode = document.createTextNode(this.msg);
   this.html.appendChild(this.textNode);
   };
draw2d.Label.prototype.setStyledText = function(text) {
   this.msg = text;
   this.html.removeChild(this.textNode);
   this.textNode = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   this.textNode.style.whiteSpace = "nowrap";
   this.textNode.innerHTML = text;
   this.html.appendChild(this.textNode);
   };
draw2d.Oval = function() {
   draw2d.VectorFigure.call(this);
   };
draw2d.Oval.prototype = new draw2d.VectorFigure;
draw2d.Oval.prototype.type = "Oval";
draw2d.Oval.prototype.paint = function() {
   draw2d.VectorFigure.prototype.paint.call(this);
   this.graphics.setStroke(this.stroke);
   if(this.bgColor != null) {
      this.graphics.setColor(this.bgColor.getHTMLStyle());
      this.graphics.fillOval(0, 0, this.getWidth() - 1, this.getHeight() - 1);
      }
   if(this.lineColor != null) {
      this.graphics.setColor(this.lineColor.getHTMLStyle());
      this.graphics.drawOval(0, 0, this.getWidth() - 1, this.getHeight() - 1);
      }
   this.graphics.paint();
   };
draw2d.Circle = function(_5012) {
   draw2d.Oval.call(this);
   if(_5012) {
      this.setDimension(_5012, _5012);
      }
   };
draw2d.Circle.prototype = new draw2d.Oval;
draw2d.Circle.prototype.type = "Circle";
draw2d.Circle.prototype.setDimension = function(w, h) {
   if(w > h) {
      draw2d.Oval.prototype.setDimension.call(this, w, w);
      }
   else {
      draw2d.Oval.prototype.setDimension.call(this, h, h);
      }
   };
draw2d.Circle.prototype.isStrechable = function() {
   return false;
   };
draw2d.Rectangle = function(width, _540e) {
   this.bgColor = null;
   this.lineColor = new draw2d.Color(0, 0, 0);
   this.lineStroke = 1;
   draw2d.Figure.call(this);
   if(width && _540e) {
      this.setDimension(width, _540e);
      }
   };
draw2d.Rectangle.prototype = new draw2d.Figure;
draw2d.Rectangle.prototype.type = "Rectangle";
draw2d.Rectangle.prototype.dispose = function() {
   draw2d.Figure.prototype.dispose.call(this);
   this.bgColor = null;
   this.lineColor = null;
   };
draw2d.Rectangle.prototype.createHTMLElement = function() {
   var item = draw2d.Figure.prototype.createHTMLElement.call(this);
   item.style.width = "auto";
   item.style.height = "auto";
   item.style.margin = "0px";
   item.style.padding = "0px";
   item.style.border = this.lineStroke + "px solid " + this.lineColor.getHTMLStyle();
   item.style.fontSize = "1px";
   item.style.lineHeight = "1px";
   item.innerHTML = "&nbsp";
   if(this.bgColor != null) {
      item.style.backgroundColor = this.bgColor.getHTMLStyle();
      }
   return item;
   };
draw2d.Rectangle.prototype.setBackgroundColor = function(color) {
   this.bgColor = color;
   if(this.bgColor != null) {
      this.html.style.backgroundColor = this.bgColor.getHTMLStyle();
      }
   else {
      this.html.style.backgroundColor = "transparent";
      }
   };
draw2d.Rectangle.prototype.getBackgroundColor = function() {
   return this.bgColor;
   };
draw2d.Rectangle.prototype.setColor = function(color) {
   this.lineColor = color;
   if(this.lineColor != null) {
      this.html.style.border = this.lineStroke + "px solid " + this.lineColor.getHTMLStyle();
      }
   else {
      this.html.style.border = this.lineStroke + "0px";
      }
   };
draw2d.Rectangle.prototype.getColor = function() {
   return this.lineColor;
   };
draw2d.Rectangle.prototype.getWidth = function() {
   return draw2d.Figure.prototype.getWidth.call(this) + 2 * this.lineStroke;
   };
draw2d.Rectangle.prototype.getHeight = function() {
   return draw2d.Figure.prototype.getHeight.call(this) + 2 * this.lineStroke;
   };
draw2d.Rectangle.prototype.setDimension = function(w, h) {
   return draw2d.Figure.prototype.setDimension.call(this, w - 2 * this.lineStroke, h - 2 * this.lineStroke);
   };
draw2d.Rectangle.prototype.setLineWidth = function(w) {
   var diff = w - this.lineStroke;
   this.setDimension(this.getWidth() - 2 * diff, this.getHeight() - 2 * diff);
   this.lineStroke = w;
   var c = "transparent";
   if(this.lineColor != null) {
      c = this.lineColor.getHTMLStyle();
      }
   this.html.style.border = this.lineStroke + "px solid " + c;
   };
draw2d.Rectangle.prototype.getLineWidth = function() {
   return this.lineStroke;
   };
draw2d.ImageFigure = function(url) {
   this.url = url;
   draw2d.Node.call(this);
   this.setDimension(40, 40);
   };
draw2d.ImageFigure.prototype = new draw2d.Node;
draw2d.ImageFigure.prototype.type = "Image";
draw2d.ImageFigure.prototype.createHTMLElement = function() {
   var item = draw2d.Node.prototype.createHTMLElement.call(this);
   item.style.width = this.width + "px";
   item.style.height = this.height + "px";
   item.style.margin = "0px";
   item.style.padding = "0px";
   item.style.border = "0px";
   if(this.url != null) {
      item.style.backgroundImage = "url(" + this.url + ")";
      }
   else {
      item.style.backgroundImage = "";
      }
   return item;
   };
draw2d.ImageFigure.prototype.setColor = function(color) {
   };
draw2d.ImageFigure.prototype.isResizeable = function() {
   return false;
   };
draw2d.ImageFigure.prototype.setImage = function(url) {
   this.url = url;
   if(this.url != null) {
      this.html.style.backgroundImage = "url(" + this.url + ")";
      }
   else {
      this.html.style.backgroundImage = "";
      }
   };
draw2d.Port = function(_4a4c, _4a4d) {
   Corona = function() {
      };
   Corona.prototype = new draw2d.Circle;
   Corona.prototype.setAlpha = function(_4a4e) {
      draw2d.Circle.prototype.setAlpha.call(this, Math.min(0.3, _4a4e));
      };
   if(_4a4c == null) {
      this.currentUIRepresentation = new draw2d.Circle();
      }
   else {
      this.currentUIRepresentation = _4a4c;
      }
   if(_4a4d == null) {
      this.connectedUIRepresentation = new draw2d.Circle();
      this.connectedUIRepresentation.setColor(null);
      }
   else {
      this.connectedUIRepresentation = _4a4d;
      }
   this.disconnectedUIRepresentation = this.currentUIRepresentation;
   this.hideIfConnected = false;
   this.uiRepresentationAdded = true;
   this.parentNode = null;
   this.originX = 0;
   this.originY = 0;
   this.coronaWidth = 10;
   this.corona = null;
   draw2d.Rectangle.call(this);
   this.setDimension(8, 8);
   this.setBackgroundColor(new draw2d.Color(100, 180, 100));
   this.setColor(new draw2d.Color(90, 150, 90));
   draw2d.Rectangle.prototype.setColor.call(this, null);
   this.dropable = new draw2d.DropTarget(this.html);
   this.dropable.node = this;
   this.dropable.addEventListener("dragenter", function(_4a4f) {
      _4a4f.target.node.onDragEnter(_4a4f.relatedTarget.node); }
   );
   this.dropable.addEventListener("dragleave", function(_4a50) {
      _4a50.target.node.onDragLeave(_4a50.relatedTarget.node); }
   );
   this.dropable.addEventListener("drop", function(_4a51) {
      _4a51.relatedTarget.node.onDrop(_4a51.target.node); }
   );
   };
draw2d.Port.prototype = new draw2d.Rectangle;
draw2d.Port.prototype.type = "Port";
draw2d.Port.ZOrderBaseIndex = 5000;
draw2d.Port.setZOrderBaseIndex = function(index) {
   draw2d.Port.ZOrderBaseIndex = index;
   };
draw2d.Port.prototype.setHideIfConnected = function(flag) {
   this.hideIfConnected = flag;
   };
draw2d.Port.prototype.dispose = function() {
   var size = this.moveListener.getSize();
   for(var i = 0; i < size; i++) {
      var _4a56 = this.moveListener.get(i);
      this.parentNode.workflow.removeFigure(_4a56);
      _4a56.dispose();
      }
   draw2d.Rectangle.prototype.dispose.call(this);
   this.parentNode = null;
   this.dropable.node = null;
   this.dropable = null;
   this.disconnectedUIRepresentation.dispose();
   this.connectedUIRepresentation.dispose();
   };
draw2d.Port.prototype.createHTMLElement = function() {
   var item = draw2d.Rectangle.prototype.createHTMLElement.call(this);
   item.style.zIndex = draw2d.Port.ZOrderBaseIndex;
   this.currentUIRepresentation.html.zIndex = draw2d.Port.ZOrderBaseIndex;
   item.appendChild(this.currentUIRepresentation.html);
   this.uiRepresentationAdded = true;
   return item;
   };
draw2d.Port.prototype.setUiRepresentation = function(_4a58) {
   if(_4a58 == null) {
      _4a58 = new draw2d.Figure();
      }
   if(this.uiRepresentationAdded) {
      this.html.removeChild(this.currentUIRepresentation.getHTMLElement());
      }
   this.html.appendChild(_4a58.getHTMLElement());
   _4a58.paint();
   this.currentUIRepresentation = _4a58;
   };
draw2d.Port.prototype.onMouseEnter = function() {
   this.setLineWidth(2);
   };
draw2d.Port.prototype.onMouseLeave = function() {
   this.setLineWidth(0);
   };
draw2d.Port.prototype.setDimension = function(width, _4a5a) {
   draw2d.Rectangle.prototype.setDimension.call(this, width, _4a5a);
   this.connectedUIRepresentation.setDimension(width, _4a5a);
   this.disconnectedUIRepresentation.setDimension(width, _4a5a);
   this.setPosition(this.x, this.y);
   };
draw2d.Port.prototype.setBackgroundColor = function(color) {
   this.currentUIRepresentation.setBackgroundColor(color);
   };
draw2d.Port.prototype.getBackgroundColor = function() {
   return this.currentUIRepresentation.getBackgroundColor();
   };
draw2d.Port.prototype.getConnections = function() {
   var _4a5c = new draw2d.ArrayList();
   var size = this.moveListener.getSize();
   for(var i = 0; i < size; i++) {
      var _4a5f = this.moveListener.get(i);
      if(_4a5f instanceof draw2d.Connection) {
         _4a5c.add(_4a5f);
         }
      }
   return _4a5c;
   };
draw2d.Port.prototype.setColor = function(color) {
   this.currentUIRepresentation.setColor(color);
   };
draw2d.Port.prototype.getColor = function() {
   return this.currentUIRepresentation.getColor();
   };
draw2d.Port.prototype.setLineWidth = function(width) {
   this.currentUIRepresentation.setLineWidth(width);
   };
draw2d.Port.prototype.getLineWidth = function() {
   return this.currentUIRepresentation.getLineWidth();
   };
draw2d.Port.prototype.paint = function() {
   this.currentUIRepresentation.paint();
   };
draw2d.Port.prototype.setPosition = function(xPos, yPos) {
   this.originX = xPos;
   this.originY = yPos;
   draw2d.Rectangle.prototype.setPosition.call(this, xPos, yPos);
   if(this.html == null) {
      return;
      }
   this.html.style.left = (this.x - this.getWidth() / 2) + "px";
   this.html.style.top = (this.y - this.getHeight() / 2) + "px";
   };
draw2d.Port.prototype.setParent = function(_4a64) {
   if(this.parentNode != null) {
      this.parentNode.detachMoveListener(this);
      }
   this.parentNode = _4a64;
   if(this.parentNode != null) {
      this.parentNode.attachMoveListener(this);
      }
   };
draw2d.Port.prototype.attachMoveListener = function(_4a65) {
   draw2d.Rectangle.prototype.attachMoveListener.call(this, _4a65);
   if(this.hideIfConnected == true) {
      this.setUiRepresentation(this.connectedUIRepresentation);
      }
   };
draw2d.Port.prototype.detachMoveListener = function(_4a66) {
   draw2d.Rectangle.prototype.detachMoveListener.call(this, _4a66);
   if(this.getConnections().getSize() == 0) {
      this.setUiRepresentation(this.disconnectedUIRepresentation);
      }
   };
draw2d.Port.prototype.getParent = function() {
   return this.parentNode;
   };
draw2d.Port.prototype.onDrag = function() {
   draw2d.Rectangle.prototype.onDrag.call(this);
   this.parentNode.workflow.showConnectionLine(this.parentNode.x + this.x, this.parentNode.y + this.y, this.parentNode.x + this.originX, this.parentNode.y + this.originY);
   };
draw2d.Port.prototype.getCoronaWidth = function() {
   return this.coronaWidth;
   };
draw2d.Port.prototype.setCoronaWidth = function(width) {
   this.coronaWidth = width;
   };
draw2d.Port.prototype.onDragend = function() {
   this.setAlpha(1);
   this.setPosition(this.originX, this.originY);
   this.parentNode.workflow.hideConnectionLine();
   };
draw2d.Port.prototype.setOrigin = function(x, y) {
   this.originX = x;
   this.originY = y;
   };
draw2d.Port.prototype.onDragEnter = function(port) {
   this.parentNode.workflow.connectionLine.setColor(new draw2d.Color(0, 150, 0));
   this.parentNode.workflow.connectionLine.setLineWidth(3);
   this.showCorona(true);
   };
draw2d.Port.prototype.onDragLeave = function(port) {
   this.parentNode.workflow.connectionLine.setColor(new draw2d.Color(0, 0, 0));
   this.parentNode.workflow.connectionLine.setLineWidth(1);
   this.showCorona(false);
   };
draw2d.Port.prototype.onDrop = function(port) {
   if(this.parentNode.id == port.parentNode.id) {
      }
   else {
      var _4a6d = new draw2d.CommandConnect(this.parentNode.workflow, port, this);
      this.parentNode.workflow.getCommandStack().execute(_4a6d);
      }
   };
draw2d.Port.prototype.getAbsolutePosition = function() {
   return new draw2d.Point(this.getAbsoluteX(), this.getAbsoluteY());
   };
draw2d.Port.prototype.getAbsoluteBounds = function() {
   return new draw2d.Dimension(this.getAbsoluteX(), this.getAbsoluteY(), this.getWidth(), this.getHeight());
   };
draw2d.Port.prototype.getAbsoluteY = function() {
   return this.originY + this.parentNode.getY();
   };
draw2d.Port.prototype.getAbsoluteX = function() {
   return this.originX + this.parentNode.getX();
   };
draw2d.Port.prototype.onOtherFigureMoved = function(_4a6e) {
   this.fireMoveEvent();
   };
draw2d.Port.prototype.getName = function() {
   return this.getProperty("name");
   };
draw2d.Port.prototype.setName = function(name) {
   this.setProperty("name", name);
   };
draw2d.Port.prototype.isOver = function(iX, iY) {
   var x = this.getAbsoluteX() - this.coronaWidth - this.getWidth() / 2;
   var y = this.getAbsoluteY() - this.coronaWidth - this.getHeight() / 2;
   var iX2 = x + this.width + (this.coronaWidth * 2) + this.getWidth() / 2;
   var iY2 = y + this.height + (this.coronaWidth * 2) + this.getHeight() / 2;
   return (iX >= x && iX <= iX2 && iY >= y && iY <= iY2);
   };
draw2d.Port.prototype.showCorona = function(flag, _4a77) {
   if(flag == true) {
      this.corona = new Corona();
      this.corona.setAlpha(0.3);
      this.corona.setBackgroundColor(new draw2d.Color(0, 125, 125));
      this.corona.setColor(null);
      this.corona.setDimension(this.getWidth() + (this.getCoronaWidth() * 2), this.getWidth() + (this.getCoronaWidth() * 2));
      this.parentNode.getWorkflow().addFigure(this.corona, this.getAbsoluteX() - this.getCoronaWidth() - this.getWidth() / 2, this.getAbsoluteY() - this.getCoronaWidth() - this.getHeight() / 2);
      }
   else {
      if(flag == false && this.corona != null) {
         this.parentNode.getWorkflow().removeFigure(this.corona);
         this.corona = null;
         }
      }
   };
draw2d.InputPort = function(_4b3c) {
   draw2d.Port.call(this, _4b3c);
   };
draw2d.InputPort.prototype = new draw2d.Port;
draw2d.InputPort.prototype.type = "InputPort";
draw2d.InputPort.prototype.onDrop = function(port) {
   if(port.getMaxFanOut && port.getMaxFanOut() <= port.getFanOut()) {
      return;
      }
   if(this.parentNode.id == port.parentNode.id) {
      }
   else {
      if(port instanceof draw2d.OutputPort) {
         var _4b3e = new draw2d.CommandConnect(this.parentNode.workflow, port, this);
         this.parentNode.workflow.getCommandStack().execute(_4b3e);
         }
      }
   };
draw2d.InputPort.prototype.onDragEnter = function(port) {
   if(port instanceof draw2d.OutputPort) {
      draw2d.Port.prototype.onDragEnter.call(this, port);
      }
   else {
      if(port instanceof draw2d.LineStartResizeHandle) {
         var line = this.workflow.currentSelection;
         if(line instanceof draw2d.Connection && line.getSource() instanceof draw2d.InputPort) {
            draw2d.Port.prototype.onDragEnter.call(this, line.getSource());
            }
         }
      else {
         if(port instanceof draw2d.LineEndResizeHandle) {
            var line = this.workflow.currentSelection;
            if(line instanceof draw2d.Connection && line.getTarget() instanceof draw2d.InputPort) {
               draw2d.Port.prototype.onDragEnter.call(this, line.getTarget());
               }
            }
         }
      }
   };
draw2d.InputPort.prototype.onDragLeave = function(port) {
   if(port instanceof draw2d.OutputPort) {
      draw2d.Port.prototype.onDragLeave.call(this, port);
      }
   else {
      if(port instanceof draw2d.LineStartResizeHandle) {
         var line = this.workflow.currentSelection;
         if(line instanceof draw2d.Connection && line.getSource() instanceof draw2d.InputPort) {
            draw2d.Port.prototype.onDragLeave.call(this, line.getSource());
            }
         }
      else {
         if(port instanceof draw2d.LineEndResizeHandle) {
            var line = this.workflow.currentSelection;
            if(line instanceof draw2d.Connection && line.getTarget() instanceof draw2d.InputPort) {
               draw2d.Port.prototype.onDragLeave.call(this, line.getTarget());
               }
            }
         }
      }
   };
draw2d.OutputPort = function(_4302) {
   draw2d.Port.call(this, _4302);
   this.maxFanOut = 100;
   };
draw2d.OutputPort.prototype = new draw2d.Port;
draw2d.OutputPort.prototype.type = "OutputPort";
draw2d.OutputPort.prototype.onDrop = function(port) {
   if(this.getMaxFanOut() <= this.getFanOut()) {
      return;
      }
   if(this.parentNode.id == port.parentNode.id) {
      }
   else {
      if(port instanceof draw2d.InputPort) {
         var _4304 = new draw2d.CommandConnect(this.parentNode.workflow, this, port);
         this.parentNode.workflow.getCommandStack().execute(_4304);
         }
      }
   };
draw2d.OutputPort.prototype.onDragEnter = function(port) {
   if(this.getMaxFanOut() <= this.getFanOut()) {
      return;
      }
   if(port instanceof draw2d.InputPort) {
      draw2d.Port.prototype.onDragEnter.call(this, port);
      }
   else {
      if(port instanceof draw2d.LineStartResizeHandle) {
         var line = this.workflow.currentSelection;
         if(line instanceof draw2d.Connection && line.getSource() instanceof draw2d.OutputPort) {
            draw2d.Port.prototype.onDragEnter.call(this, line.getSource());
            }
         }
      else {
         if(port instanceof draw2d.LineEndResizeHandle) {
            var line = this.workflow.currentSelection;
            if(line instanceof draw2d.Connection && line.getTarget() instanceof draw2d.OutputPort) {
               draw2d.Port.prototype.onDragEnter.call(this, line.getTarget());
               }
            }
         }
      }
   };
draw2d.OutputPort.prototype.onDragLeave = function(port) {
   if(port instanceof draw2d.InputPort) {
      draw2d.Port.prototype.onDragLeave.call(this, port);
      }
   else {
      if(port instanceof draw2d.LineStartResizeHandle) {
         var line = this.workflow.currentSelection;
         if(line instanceof draw2d.Connection && line.getSource() instanceof draw2d.OutputPort) {
            draw2d.Port.prototype.onDragLeave.call(this, line.getSource());
            }
         }
      else {
         if(port instanceof draw2d.LineEndResizeHandle) {
            var line = this.workflow.currentSelection;
            if(line instanceof draw2d.Connection && line.getTarget() instanceof draw2d.OutputPort) {
               draw2d.Port.prototype.onDragLeave.call(this, line.getTarget());
               }
            }
         }
      }
   };
draw2d.OutputPort.prototype.onDragstart = function(x, y) {
   if(this.maxFanOut ==- 1) {
      return true;
      }
   if(this.getMaxFanOut() <= this.getFanOut()) {
      return false;
      }
   return true;
   };
draw2d.OutputPort.prototype.setMaxFanOut = function(count) {
   this.maxFanOut = count;
   };
draw2d.OutputPort.prototype.getMaxFanOut = function() {
   return this.maxFanOut;
   };
draw2d.OutputPort.prototype.getFanOut = function() {
   if(this.getParent().workflow == null) {
      return 0;
      }
   var count = 0;
   var lines = this.getParent().workflow.getLines();
   var size = lines.getSize();
   for(var i = 0; i < size; i++) {
      var line = lines.get(i);
      if(line instanceof draw2d.Connection) {
         if(line.getSource() == this) {
            count++;
            }
         else {
            if(line.getTarget() == this) {
               count++;
               }
            }
         }
      }
   return count;
   };
draw2d.Line = function() {
   this.lineColor = new draw2d.Color(0, 0, 0);
   this.stroke = 1;
   this.canvas = null;
   this.workflow = null;
   this.html = null;
   this.graphics = null;
   this.id = this.generateUId();
   this.startX = 30;
   this.startY = 30;
   this.endX = 100;
   this.endY = 100;
   this.alpha = 1;
   this.isMoving = false;
   this.zOrder = draw2d.Line.ZOrderBaseIndex;
   this.moveListener = new draw2d.ArrayList();
   this.setSelectable(true);
   this.setDeleteable(true);
   };
draw2d.Line.ZOrderBaseIndex = 200;
draw2d.Line.setZOrderBaseIndex = function(index) {
   draw2d.Line.ZOrderBaseIndex = index;
   };
draw2d.Line.prototype.dispose = function() {
   this.canvas = null;
   this.workflow = null;
   if(this.graphics != null) {
      this.graphics.clear();
      }
   this.graphics = null;
   };
draw2d.Line.prototype.getZOrder = function() {
   return this.zOrder;
   };
draw2d.Line.prototype.setZOrder = function(index) {
   if(this.html != null) {
      this.html.style.zIndex = index;
      }
   this.zOrder = index;
   };
draw2d.Line.prototype.createHTMLElement = function() {
   var item = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   item.id = this.id;
   item.style.position = "absolute";
   item.style.left = "0px";
   item.style.top = "0px";
   item.style.height = "0px";
   item.style.width = "0px";
   item.style.zIndex = this.zOrder;
   return item;
   };
draw2d.Line.prototype.getHTMLElement = function() {
   if(this.html == null) {
      this.html = this.createHTMLElement();
      }
   return this.html;
   };
draw2d.Line.prototype.getWorkflow = function() {
   return this.workflow;
   };
draw2d.Line.prototype.isResizeable = function() {
   return true;
   };
draw2d.Line.prototype.setCanvas = function(_462e) {
   this.canvas = _462e;
   if(this.graphics != null) {
      this.graphics.clear();
      }
   this.graphics = null;
   };
draw2d.Line.prototype.setWorkflow = function(_462f) {
   this.workflow = _462f;
   if(this.graphics != null) {
      this.graphics.clear();
      }
   this.graphics = null;
   };
draw2d.Line.prototype.paint = function() {
   if(this.graphics == null) {
      this.graphics = new jsGraphics(this.id);
      }
   else {
      this.graphics.clear();
      }
   this.graphics.setStroke(this.stroke);
   this.graphics.setColor(this.lineColor.getHTMLStyle());
   this.graphics.drawLine(this.startX, this.startY, this.endX, this.endY);
   this.graphics.paint();
   };
draw2d.Line.prototype.attachMoveListener = function(_4630) {
   this.moveListener.add(_4630);
   };
draw2d.Line.prototype.detachMoveListener = function(_4631) {
   this.moveListener.remove(_4631);
   };
draw2d.Line.prototype.fireMoveEvent = function() {
   var size = this.moveListener.getSize();
   for(var i = 0; i < size; i++) {
      this.moveListener.get(i).onOtherFigureMoved(this);
      }
   };
draw2d.Line.prototype.onOtherFigureMoved = function(_4634) {
   };
draw2d.Line.prototype.setLineWidth = function(w) {
   this.stroke = w;
   if(this.graphics != null) {
      this.paint();
      }
   this.setDocumentDirty();
   };
draw2d.Line.prototype.setColor = function(color) {
   this.lineColor = color;
   if(this.graphics != null) {
      this.paint();
      }
   this.setDocumentDirty();
   };
draw2d.Line.prototype.getColor = function() {
   return this.lineColor;
   };
draw2d.Line.prototype.setAlpha = function(_4637) {
   if(_4637 == this.alpha) {
      return;
      }
   try {
      this.html.style.MozOpacity = _4637;
      }
   catch(exc) {
      }
   try {
      this.html.style.opacity = _4637;
      }
   catch(exc) {
      }
   try {
      var _4638 = Math.round(_4637 * 100);
      if(_4638 >= 99) {
         this.html.style.filter = "";
         }
      else {
         this.html.style.filter = "alpha(opacity=" + _4638 + ")";
         }
      }
   catch(exc) {
      }
   this.alpha = _4637;
   };
draw2d.Line.prototype.setStartPoint = function(x, y) {
   this.startX = x;
   this.startY = y;
   if(this.graphics != null) {
      this.paint();
      }
   this.setDocumentDirty();
   };
draw2d.Line.prototype.setEndPoint = function(x, y) {
   this.endX = x;
   this.endY = y;
   if(this.graphics != null) {
      this.paint();
      }
   this.setDocumentDirty();
   };
draw2d.Line.prototype.getStartX = function() {
   return this.startX;
   };
draw2d.Line.prototype.getStartY = function() {
   return this.startY;
   };
draw2d.Line.prototype.getStartPoint = function() {
   return new draw2d.Point(this.startX, this.startY);
   };
draw2d.Line.prototype.getEndX = function() {
   return this.endX;
   };
draw2d.Line.prototype.getEndY = function() {
   return this.endY;
   };
draw2d.Line.prototype.getEndPoint = function() {
   return new draw2d.Point(this.endX, this.endY);
   };
draw2d.Line.prototype.isSelectable = function() {
   return this.selectable;
   };
draw2d.Line.prototype.setSelectable = function(flag) {
   this.selectable = flag;
   };
draw2d.Line.prototype.isDeleteable = function() {
   return this.deleteable;
   };
draw2d.Line.prototype.setDeleteable = function(flag) {
   this.deleteable = flag;
   };
draw2d.Line.prototype.getLength = function() {
   return Math.sqrt((this.startX - this.endX) * (this.startX - this.endX) + (this.startY - this.endY) * (this.startY - this.endY));
   };
draw2d.Line.prototype.getAngle = function() {
   var _463f = this.getLength();
   var angle =- (180 / Math.PI) * Math.asin((this.startY - this.endY) / _463f);
   if(angle < 0) {
      if(this.endX < this.startX) {
         angle = Math.abs(angle) + 180;
         }
      else {
         angle = 360 - Math.abs(angle);
         }
      }
   else {
      if(this.endX < this.startX) {
         angle = 180 - angle;
         }
      }
   return angle;
   };
draw2d.Line.prototype.onContextMenu = function(x, y) {
   var menu = this.getContextMenu();
   if(menu != null) {
      this.workflow.showMenu(menu, x, y);
      }
   };
draw2d.Line.prototype.getContextMenu = function() {
   return null;
   };
draw2d.Line.prototype.onDoubleClick = function() {
   };
draw2d.Line.prototype.setDocumentDirty = function() {
   if(this.workflow != null) {
      this.workflow.setDocumentDirty();
      }
   };
draw2d.Line.prototype.generateUId = function() {
   var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
   var _4645 = 10;
   var _4646 = 10;
   nbTry = 0;
   while(nbTry < 1000) {
      var id = "";
      for(var i = 0; i < _4645; i++) {
         var rnum = Math.floor(Math.random() * chars.length);
         id += chars.substring(rnum, rnum + 1);
         }
      elem = document.getElementById(id);
      if(!elem) {
         return id;
         }
      nbTry += 1;
      }
   return null;
   };
draw2d.Line.prototype.containsPoint = function(px, py) {
   return draw2d.Line.hit(this.startX, this.startY, this.endX, this.endY, px, py);
   };
draw2d.Line.hit = function(X1, Y1, X2, Y2, px, py) {
   var _4652 = 5;
   X2 -= X1;
   Y2 -= Y1;
   px -= X1;
   py -= Y1;
   var _4653 = px * X2 + py * Y2;
   var _4654;
   if(_4653 <= 0) {
      _4654 = 0;
      }
   else {
      px = X2 - px;
      py = Y2 - py;
      _4653 = px * X2 + py * Y2;
      if(_4653 <= 0) {
         _4654 = 0;
         }
      else {
         _4654 = _4653 * _4653 / (X2 * X2 + Y2 * Y2);
         }
      }
   var lenSq = px * px + py * py - _4654;
   if(lenSq < 0) {
      lenSq = 0;
      }
   return Math.sqrt(lenSq) < _4652;
   };
draw2d.ConnectionRouter = function() {
   };
draw2d.ConnectionRouter.prototype.type = "ConnectionRouter";
draw2d.ConnectionRouter.prototype.getDirection = function(r, p) {
   var _467d = Math.abs(r.x - p.x);
   var _467e = 3;
   var i = Math.abs(r.y - p.y);
   if(i <= _467d) {
      _467d = i;
      _467e = 0;
      }
   i = Math.abs(r.getBottom() - p.y);
   if(i <= _467d) {
      _467d = i;
      _467e = 2;
      }
   i = Math.abs(r.getRight() - p.x);
   if(i < _467d) {
      _467d = i;
      _467e = 1;
      }
   return _467e;
   };
draw2d.ConnectionRouter.prototype.getEndDirection = function(conn) {
   var p = conn.getEndPoint();
   var rect = conn.getTarget().getParent().getBounds();
   return this.getDirection(rect, p);
   };
draw2d.ConnectionRouter.prototype.getStartDirection = function(conn) {
   var p = conn.getStartPoint();
   var rect = conn.getSource().getParent().getBounds();
   return this.getDirection(rect, p);
   };
draw2d.ConnectionRouter.prototype.route = function(_4686) {
   };
draw2d.NullConnectionRouter = function() {
   };
draw2d.NullConnectionRouter.prototype = new draw2d.ConnectionRouter;
draw2d.NullConnectionRouter.prototype.type = "NullConnectionRouter";
draw2d.NullConnectionRouter.prototype.invalidate = function() {
   };
draw2d.NullConnectionRouter.prototype.route = function(_574e) {
   _574e.addPoint(_574e.getStartPoint());
   _574e.addPoint(_574e.getEndPoint());
   };
draw2d.ManhattanConnectionRouter = function() {
   this.MINDIST = 20;
   };
draw2d.ManhattanConnectionRouter.prototype = new draw2d.ConnectionRouter;
draw2d.ManhattanConnectionRouter.prototype.type = "ManhattanConnectionRouter";
draw2d.ManhattanConnectionRouter.prototype.route = function(conn) {
   var _52fa = conn.getStartPoint();
   var _52fb = this.getStartDirection(conn);
   var toPt = conn.getEndPoint();
   var toDir = this.getEndDirection(conn);
   this._route(conn, toPt, toDir, _52fa, _52fb);
   };
draw2d.ManhattanConnectionRouter.prototype._route = function(conn, _52ff, _5300, toPt, toDir) {
   var TOL = 0.1;
   var _5304 = 0.01;
   var UP = 0;
   var RIGHT = 1;
   var DOWN = 2;
   var LEFT = 3;
   var xDiff = _52ff.x - toPt.x;
   var yDiff = _52ff.y - toPt.y;
   var point;
   var dir;
   if(((xDiff * xDiff) < (_5304)) && ((yDiff * yDiff) < (_5304))) {
      conn.addPoint(new draw2d.Point(toPt.x, toPt.y));
      return;
      }
   if(_5300 == LEFT) {
      if((xDiff > 0) && ((yDiff * yDiff) < TOL) && (toDir == RIGHT)) {
         point = toPt;
         dir = toDir;
         }
      else {
         if(xDiff < 0) {
            point = new draw2d.Point(_52ff.x - this.MINDIST, _52ff.y);
            }
         else {
            if(((yDiff > 0) && (toDir == DOWN)) || ((yDiff < 0) && (toDir == UP))) {
               point = new draw2d.Point(toPt.x, _52ff.y);
               }
            else {
               if(_5300 == toDir) {
                  var pos = Math.min(_52ff.x, toPt.x) - this.MINDIST;
                  point = new draw2d.Point(pos, _52ff.y);
                  }
               else {
                  point = new draw2d.Point(_52ff.x - (xDiff / 2), _52ff.y);
                  }
               }
            }
         if(yDiff > 0) {
            dir = UP;
            }
         else {
            dir = DOWN;
            }
         }
      }
   else {
      if(_5300 == RIGHT) {
         if((xDiff < 0) && ((yDiff * yDiff) < TOL) && (toDir == LEFT)) {
            point = toPt;
            dir = toDir;
            }
         else {
            if(xDiff > 0) {
               point = new draw2d.Point(_52ff.x + this.MINDIST, _52ff.y);
               }
            else {
               if(((yDiff > 0) && (toDir == DOWN)) || ((yDiff < 0) && (toDir == UP))) {
                  point = new draw2d.Point(toPt.x, _52ff.y);
                  }
               else {
                  if(_5300 == toDir) {
                     var pos = Math.max(_52ff.x, toPt.x) + this.MINDIST;
                     point = new draw2d.Point(pos, _52ff.y);
                     }
                  else {
                     point = new draw2d.Point(_52ff.x - (xDiff / 2), _52ff.y);
                     }
                  }
               }
            if(yDiff > 0) {
               dir = UP;
               }
            else {
               dir = DOWN;
               }
            }
         }
      else {
         if(_5300 == DOWN) {
            if(((xDiff * xDiff) < TOL) && (yDiff < 0) && (toDir == UP)) {
               point = toPt;
               dir = toDir;
               }
            else {
               if(yDiff > 0) {
                  point = new draw2d.Point(_52ff.x, _52ff.y + this.MINDIST);
                  }
               else {
                  if(((xDiff > 0) && (toDir == RIGHT)) || ((xDiff < 0) && (toDir == LEFT))) {
                     point = new draw2d.Point(_52ff.x, toPt.y);
                     }
                  else {
                     if(_5300 == toDir) {
                        var pos = Math.max(_52ff.y, toPt.y) + this.MINDIST;
                        point = new draw2d.Point(_52ff.x, pos);
                        }
                     else {
                        point = new draw2d.Point(_52ff.x, _52ff.y - (yDiff / 2));
                        }
                     }
                  }
               if(xDiff > 0) {
                  dir = LEFT;
                  }
               else {
                  dir = RIGHT;
                  }
               }
            }
         else {
            if(_5300 == UP) {
               if(((xDiff * xDiff) < TOL) && (yDiff > 0) && (toDir == DOWN)) {
                  point = toPt;
                  dir = toDir;
                  }
               else {
                  if(yDiff < 0) {
                     point = new draw2d.Point(_52ff.x, _52ff.y - this.MINDIST);
                     }
                  else {
                     if(((xDiff > 0) && (toDir == RIGHT)) || ((xDiff < 0) && (toDir == LEFT))) {
                        point = new draw2d.Point(_52ff.x, toPt.y);
                        }
                     else {
                        if(_5300 == toDir) {
                           var pos = Math.min(_52ff.y, toPt.y) - this.MINDIST;
                           point = new draw2d.Point(_52ff.x, pos);
                           }
                        else {
                           point = new draw2d.Point(_52ff.x, _52ff.y - (yDiff / 2));
                           }
                        }
                     }
                  if(xDiff > 0) {
                     dir = LEFT;
                     }
                  else {
                     dir = RIGHT;
                     }
                  }
               }
            }
         }
      }
   this._route(conn, point, dir, toPt, toDir);
   conn.addPoint(_52ff);
   };
draw2d.BezierConnectionRouter = function(_532a) {
   if(!_532a) {
      this.cheapRouter = new draw2d.ManhattanConnectionRouter();
      }
   else {
      this.cheapRouter = null;
      }
   this.iteration = 5;
   };
draw2d.BezierConnectionRouter.prototype = new draw2d.ConnectionRouter;
draw2d.BezierConnectionRouter.prototype.type = "BezierConnectionRouter";
draw2d.BezierConnectionRouter.prototype.drawBezier = function(_532b, _532c, t, iter) {
   var n = _532b.length - 1;
   var q = new Array();
   var _5331 = n + 1;
   for(var i = 0; i < _5331; i++) {
      q[i] = new Array();
      q[i][0] = _532b[i];
      }
   for(var j = 1; j <= n; j++) {
      for(var i = 0; i <= (n - j); i++) {
         q[i][j] = new draw2d.Point((1 - t) * q[i][j - 1].x + t * q[i + 1][j - 1].x, (1 - t) * q[i][j - 1].y + t * q[i + 1][j - 1].y);
         }
      }
   var c1 = new Array();
   var c2 = new Array();
   for(var i = 0; i < n + 1; i++) {
      c1[i] = q[0][i];
      c2[i] = q[i][n - i];
      }
   if(iter >= 0) {
      this.drawBezier(c1, _532c, t, --iter);
      this.drawBezier(c2, _532c, t, --iter);
      }
   else {
      for(var i = 0; i < n; i++) {
         _532c.push(q[i][n - i]);
         }
      }
   };
draw2d.BezierConnectionRouter.prototype.route = function(conn) {
   if(this.cheapRouter != null && (conn.getSource().getParent().isMoving == true || conn.getTarget().getParent().isMoving == true)) {
      this.cheapRouter.route(conn);
      return;
      }
   var _5337 = new Array();
   var _5338 = conn.getStartPoint();
   var toPt = conn.getEndPoint();
   this._route(_5337, conn, toPt, this.getEndDirection(conn), _5338, this.getStartDirection(conn));
   var _533a = new Array();
   this.drawBezier(_5337, _533a, 0.5, this.iteration);
   for(var i = 0; i < _533a.length; i++) {
      conn.addPoint(_533a[i]);
      }
   conn.addPoint(toPt);
   };
draw2d.BezierConnectionRouter.prototype._route = function(_533c, conn, _533e, _533f, toPt, toDir) {
   var TOL = 0.1;
   var _5343 = 0.01;
   var _5344 = 90;
   var UP = 0;
   var RIGHT = 1;
   var DOWN = 2;
   var LEFT = 3;
   var xDiff = _533e.x - toPt.x;
   var yDiff = _533e.y - toPt.y;
   var point;
   var dir;
   if(((xDiff * xDiff) < (_5343)) && ((yDiff * yDiff) < (_5343))) {
      _533c.push(new draw2d.Point(toPt.x, toPt.y));
      return;
      }
   if(_533f == LEFT) {
      if((xDiff > 0) && ((yDiff * yDiff) < TOL) && (toDir == RIGHT)) {
         point = toPt;
         dir = toDir;
         }
      else {
         if(xDiff < 0) {
            point = new draw2d.Point(_533e.x - _5344, _533e.y);
            }
         else {
            if(((yDiff > 0) && (toDir == DOWN)) || ((yDiff < 0) && (toDir == UP))) {
               point = new draw2d.Point(toPt.x, _533e.y);
               }
            else {
               if(_533f == toDir) {
                  var pos = Math.min(_533e.x, toPt.x) - _5344;
                  point = new draw2d.Point(pos, _533e.y);
                  }
               else {
                  point = new draw2d.Point(_533e.x - (xDiff / 2), _533e.y);
                  }
               }
            }
         if(yDiff > 0) {
            dir = UP;
            }
         else {
            dir = DOWN;
            }
         }
      }
   else {
      if(_533f == RIGHT) {
         if((xDiff < 0) && ((yDiff * yDiff) < TOL) && (toDir == LEFT)) {
            point = toPt;
            dir = toDir;
            }
         else {
            if(xDiff > 0) {
               point = new draw2d.Point(_533e.x + _5344, _533e.y);
               }
            else {
               if(((yDiff > 0) && (toDir == DOWN)) || ((yDiff < 0) && (toDir == UP))) {
                  point = new draw2d.Point(toPt.x, _533e.y);
                  }
               else {
                  if(_533f == toDir) {
                     var pos = Math.max(_533e.x, toPt.x) + _5344;
                     point = new draw2d.Point(pos, _533e.y);
                     }
                  else {
                     point = new draw2d.Point(_533e.x - (xDiff / 2), _533e.y);
                     }
                  }
               }
            if(yDiff > 0) {
               dir = UP;
               }
            else {
               dir = DOWN;
               }
            }
         }
      else {
         if(_533f == DOWN) {
            if(((xDiff * xDiff) < TOL) && (yDiff < 0) && (toDir == UP)) {
               point = toPt;
               dir = toDir;
               }
            else {
               if(yDiff > 0) {
                  point = new draw2d.Point(_533e.x, _533e.y + _5344);
                  }
               else {
                  if(((xDiff > 0) && (toDir == RIGHT)) || ((xDiff < 0) && (toDir == LEFT))) {
                     point = new draw2d.Point(_533e.x, toPt.y);
                     }
                  else {
                     if(_533f == toDir) {
                        var pos = Math.max(_533e.y, toPt.y) + _5344;
                        point = new draw2d.Point(_533e.x, pos);
                        }
                     else {
                        point = new draw2d.Point(_533e.x, _533e.y - (yDiff / 2));
                        }
                     }
                  }
               if(xDiff > 0) {
                  dir = LEFT;
                  }
               else {
                  dir = RIGHT;
                  }
               }
            }
         else {
            if(_533f == UP) {
               if(((xDiff * xDiff) < TOL) && (yDiff > 0) && (toDir == DOWN)) {
                  point = toPt;
                  dir = toDir;
                  }
               else {
                  if(yDiff < 0) {
                     point = new draw2d.Point(_533e.x, _533e.y - _5344);
                     }
                  else {
                     if(((xDiff > 0) && (toDir == RIGHT)) || ((xDiff < 0) && (toDir == LEFT))) {
                        point = new draw2d.Point(_533e.x, toPt.y);
                        }
                     else {
                        if(_533f == toDir) {
                           var pos = Math.min(_533e.y, toPt.y) - _5344;
                           point = new draw2d.Point(_533e.x, pos);
                           }
                        else {
                           point = new draw2d.Point(_533e.x, _533e.y - (yDiff / 2));
                           }
                        }
                     }
                  if(xDiff > 0) {
                     dir = LEFT;
                     }
                  else {
                     dir = RIGHT;
                     }
                  }
               }
            }
         }
      }
   this._route(_533c, conn, point, dir, toPt, toDir);
   _533c.push(_533e);
   };
draw2d.FanConnectionRouter = function() {
   };
draw2d.FanConnectionRouter.prototype = new draw2d.NullConnectionRouter;
draw2d.FanConnectionRouter.prototype.type = "FanConnectionRouter";
draw2d.FanConnectionRouter.prototype.route = function(conn) {
   var _53ed = conn.getStartPoint();
   var toPt = conn.getEndPoint();
   var lines = conn.getSource().getConnections();
   var _53f0 = new draw2d.ArrayList();
   var index = 0;
   for(var i = 0; i < lines.getSize(); i++) {
      var _53f3 = lines.get(i);
      if(_53f3.getTarget() == conn.getTarget() || _53f3.getSource() == conn.getTarget()) {
         _53f0.add(_53f3);
         if(conn == _53f3) {
            index = _53f0.getSize();
            }
         }
      }
   if(_53f0.getSize() > 1) {
      this.routeCollision(conn, index);
      }
   else {
      draw2d.NullConnectionRouter.prototype.route.call(this, conn);
      }
   };
draw2d.FanConnectionRouter.prototype.routeNormal = function(conn) {
   conn.addPoint(conn.getStartPoint());
   conn.addPoint(conn.getEndPoint());
   };
draw2d.FanConnectionRouter.prototype.routeCollision = function(conn, index) {
   var start = conn.getStartPoint();
   var end = conn.getEndPoint();
   conn.addPoint(start);
   var _53f9 = 10;
   var _53fa = new draw2d.Point((end.x + start.x) / 2, (end.y + start.y) / 2);
   var _53fb = end.getPosition(start);
   var ray;
   if(_53fb == draw2d.PositionConstants.SOUTH || _53fb == draw2d.PositionConstants.EAST) {
      ray = new draw2d.Point(end.x - start.x, end.y - start.y);
      }
   else {
      ray = new draw2d.Point(start.x - end.x, start.y - end.y);
      }
   var _53fd = Math.sqrt(ray.x * ray.x + ray.y * ray.y);
   var _53fe = _53f9 * ray.x / _53fd;
   var _53ff = _53f9 * ray.y / _53fd;
   var _5400;
   if(index % 2 == 0) {
      _5400 = new draw2d.Point(_53fa.x + (index / 2) * ( - 1 * _53ff), _53fa.y + (index / 2) * _53fe);
      }
   else {
      _5400 = new draw2d.Point(_53fa.x + (index / 2) * _53ff, _53fa.y + (index / 2) * ( - 1 * _53fe));
      }
   conn.addPoint(_5400);
   conn.addPoint(end);
   };
draw2d.Graphics = function(_457c, _457d, _457e) {
   this.jsGraphics = _457c;
   this.xt = _457e.x;
   this.yt = _457e.y;
   this.radian = _457d * Math.PI / 180;
   this.sinRadian = Math.sin(this.radian);
   this.cosRadian = Math.cos(this.radian);
   };
draw2d.Graphics.prototype.setStroke = function(x) {
   this.jsGraphics.setStroke(x);
   };
draw2d.Graphics.prototype.drawLine = function(x1, y1, x2, y2) {
   var _x1 = this.xt + x1 * this.cosRadian - y1 * this.sinRadian;
   var _y1 = this.yt + x1 * this.sinRadian + y1 * this.cosRadian;
   var _x2 = this.xt + x2 * this.cosRadian - y2 * this.sinRadian;
   var _y2 = this.yt + x2 * this.sinRadian + y2 * this.cosRadian;
   this.jsGraphics.drawLine(_x1, _y1, _x2, _y2);
   };
draw2d.Graphics.prototype.fillRect = function(x, y, w, h) {
   var x1 = this.xt + x * this.cosRadian - y * this.sinRadian;
   var y1 = this.yt + x * this.sinRadian + y * this.cosRadian;
   var x2 = this.xt + (x + w) * this.cosRadian - y * this.sinRadian;
   var y2 = this.yt + (x + w) * this.sinRadian + y * this.cosRadian;
   var x3 = this.xt + (x + w) * this.cosRadian - (y + h) * this.sinRadian;
   var y3 = this.yt + (x + w) * this.sinRadian + (y + h) * this.cosRadian;
   var x4 = this.xt + x * this.cosRadian - (y + h) * this.sinRadian;
   var y4 = this.yt + x * this.sinRadian + (y + h) * this.cosRadian;
   this.jsGraphics.fillPolygon([x1, x2, x3, x4], [y1, y2, y3, y4]);
   };
draw2d.Graphics.prototype.fillPolygon = function(_4594, _4595) {
   var rotX = new Array();
   var rotY = new Array();
   for(var i = 0; i < _4594.length; i++) {
      rotX[i] = this.xt + _4594[i] * this.cosRadian - _4595[i] * this.sinRadian;
      rotY[i] = this.yt + _4594[i] * this.sinRadian + _4595[i] * this.cosRadian;
      }
   this.jsGraphics.fillPolygon(rotX, rotY);
   };
draw2d.Graphics.prototype.setColor = function(color) {
   this.jsGraphics.setColor(color.getHTMLStyle());
   };
draw2d.Graphics.prototype.drawPolygon = function(_459a, _459b) {
   var rotX = new Array();
   var rotY = new Array();
   for(var i = 0; i < _459a.length; i++) {
      rotX[i] = this.xt + _459a[i] * this.cosRadian - _459b[i] * this.sinRadian;
      rotY[i] = this.yt + _459a[i] * this.sinRadian + _459b[i] * this.cosRadian;
      }
   this.jsGraphics.drawPolygon(rotX, rotY);
   };
draw2d.Connection = function() {
   draw2d.Line.call(this);
   this.sourcePort = null;
   this.targetPort = null;
   this.sourceDecorator = null;
   this.targetDecorator = null;
   this.sourceAnchor = new draw2d.ConnectionAnchor();
   this.targetAnchor = new draw2d.ConnectionAnchor();
   this.router = draw2d.Connection.defaultRouter;
   this.lineSegments = new draw2d.ArrayList();
   this.children = new draw2d.ArrayList();
   this.setColor(new draw2d.Color(0, 0, 115));
   this.setLineWidth(1);
   };
draw2d.Connection.prototype = new draw2d.Line;
draw2d.Connection.defaultRouter = new draw2d.ManhattanConnectionRouter();
draw2d.Connection.setDefaultRouter = function(_4ec6) {
   draw2d.Connection.defaultRouter = _4ec6;
   };
draw2d.Connection.prototype.disconnect = function() {
   if(this.sourcePort != null) {
      this.sourcePort.detachMoveListener(this);
      this.fireSourcePortRouteEvent();
      }
   if(this.targetPort != null) {
      this.targetPort.detachMoveListener(this);
      this.fireTargetPortRouteEvent();
      }
   };
draw2d.Connection.prototype.reconnect = function() {
   if(this.sourcePort != null) {
      this.sourcePort.attachMoveListener(this);
      this.fireSourcePortRouteEvent();
      }
   if(this.targetPort != null) {
      this.targetPort.attachMoveListener(this);
      this.fireTargetPortRouteEvent();
      }
   };
draw2d.Connection.prototype.isResizeable = function() {
   return true;
   };
draw2d.Connection.prototype.addFigure = function(_4ec7, _4ec8) {
   var entry = new Object();
   entry.figure = _4ec7;
   entry.locator = _4ec8;
   this.children.add(entry);
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.Connection.prototype.setSourceDecorator = function(_4eca) {
   this.sourceDecorator = _4eca;
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.Connection.prototype.setTargetDecorator = function(_4ecb) {
   this.targetDecorator = _4ecb;
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.Connection.prototype.setSourceAnchor = function(_4ecc) {
   this.sourceAnchor = _4ecc;
   this.sourceAnchor.setOwner(this.sourcePort);
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.Connection.prototype.setTargetAnchor = function(_4ecd) {
   this.targetAnchor = _4ecd;
   this.targetAnchor.setOwner(this.targetPort);
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.Connection.prototype.setRouter = function(_4ece) {
   if(_4ece != null) {
      this.router = _4ece;
      }
   else {
      this.router = new draw2d.NullConnectionRouter();
      }
   if(this.graphics != null) {
      this.paint();
      }
   };
draw2d.Connection.prototype.getRouter = function() {
   return this.router;
   };
draw2d.Connection.prototype.paint = function() {
   for(var i = 0; i < this.children.getSize(); i++) {
      var entry = this.children.get(i);
      if(entry.isAppended == true) {
         this.html.removeChild(entry.figure.getHTMLElement());
         }
      entry.isAppended = false;
      }
   if(this.graphics == null) {
      this.graphics = new jsGraphics(this.id);
      }
   else {
      this.graphics.clear();
      }
   this.graphics.setStroke(this.stroke);
   this.graphics.setColor(this.lineColor.getHTMLStyle());
   this.startStroke();
   this.router.route(this);
   if(this.getSource().getParent().isMoving == false && this.getTarget().getParent().isMoving == false) {
      if(this.targetDecorator != null) {
         this.targetDecorator.paint(new draw2d.Graphics(this.graphics, this.getEndAngle(), this.getEndPoint()));
         }
      if(this.sourceDecorator != null) {
         this.sourceDecorator.paint(new draw2d.Graphics(this.graphics, this.getStartAngle(), this.getStartPoint()));
         }
      }
   this.finishStroke();
   for(var i = 0; i < this.children.getSize(); i++) {
      var entry = this.children.get(i);
      this.html.appendChild(entry.figure.getHTMLElement());
      entry.isAppended = true;
      entry.locator.relocate(entry.figure);
      }
   };
draw2d.Connection.prototype.getStartPoint = function() {
   if(this.isMoving == false) {
      return this.sourceAnchor.getLocation(this.targetAnchor.getReferencePoint());
      }
   else {
      return draw2d.Line.prototype.getStartPoint.call(this);
      }
   };
draw2d.Connection.prototype.getEndPoint = function() {
   if(this.isMoving == false) {
      return this.targetAnchor.getLocation(this.sourceAnchor.getReferencePoint());
      }
   else {
      return draw2d.Line.prototype.getEndPoint.call(this);
      }
   };
draw2d.Connection.prototype.startStroke = function() {
   this.oldPoint = null;
   this.lineSegments = new draw2d.ArrayList();
   };
draw2d.Connection.prototype.finishStroke = function() {
   this.graphics.paint();
   this.oldPoint = null;
   };
draw2d.Connection.prototype.getPoints = function() {
   var _4ed1 = new draw2d.ArrayList();
   var line;
   for(var i = 0; i < this.lineSegments.getSize(); i++) {
      line = this.lineSegments.get(i);
      _4ed1.add(line.start);
      }
   _4ed1.add(line.end);
   return _4ed1;
   };
draw2d.Connection.prototype.addPoint = function(p) {
   p = new draw2d.Point(parseInt(p.x), parseInt(p.y));
   if(this.oldPoint != null) {
      this.graphics.drawLine(this.oldPoint.x, this.oldPoint.y, p.x, p.y);
      var line = new Object();
      line.start = this.oldPoint;
      line.end = p;
      this.lineSegments.add(line);
      }
   this.oldPoint = new Object();
   this.oldPoint.x = p.x;
   this.oldPoint.y = p.y;
   };
draw2d.Connection.prototype.setSource = function(port) {
   if(this.sourcePort != null) {
      this.sourcePort.detachMoveListener(this);
      }
   this.sourcePort = port;
   if(this.sourcePort == null) {
      return;
      }
   this.sourceAnchor.setOwner(this.sourcePort);
   this.fireSourcePortRouteEvent();
   this.sourcePort.attachMoveListener(this);
   this.setStartPoint(port.getAbsoluteX(), port.getAbsoluteY());
   };
draw2d.Connection.prototype.getSource = function() {
   return this.sourcePort;
   };
draw2d.Connection.prototype.setTarget = function(port) {
   if(this.targetPort != null) {
      this.targetPort.detachMoveListener(this);
      }
   this.targetPort = port;
   if(this.targetPort == null) {
      return;
      }
   this.targetAnchor.setOwner(this.targetPort);
   this.fireTargetPortRouteEvent();
   this.targetPort.attachMoveListener(this);
   this.setEndPoint(port.getAbsoluteX(), port.getAbsoluteY());
   };
draw2d.Connection.prototype.getTarget = function() {
   return this.targetPort;
   };
draw2d.Connection.prototype.onOtherFigureMoved = function(_4ed8) {
   if(_4ed8 == this.sourcePort) {
      this.setStartPoint(this.sourcePort.getAbsoluteX(), this.sourcePort.getAbsoluteY());
      }
   else {
      this.setEndPoint(this.targetPort.getAbsoluteX(), this.targetPort.getAbsoluteY());
      }
   };
draw2d.Connection.prototype.containsPoint = function(px, py) {
   for(var i = 0; i < this.lineSegments.getSize(); i++) {
      var line = this.lineSegments.get(i);
      if(draw2d.Line.hit(line.start.x, line.start.y, line.end.x, line.end.y, px, py)) {
         return true;
         }
      }
   return false;
   };
draw2d.Connection.prototype.getStartAngle = function() {
   var p1 = this.lineSegments.get(0).start;
   var p2 = this.lineSegments.get(0).end;
   if(this.router instanceof draw2d.BezierConnectionRouter) {
      p2 = this.lineSegments.get(5).end;
      }
   var _4edf = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
   var angle =- (180 / Math.PI) * Math.asin((p1.y - p2.y) / _4edf);
   if(angle < 0) {
      if(p2.x < p1.x) {
         angle = Math.abs(angle) + 180;
         }
      else {
         angle = 360 - Math.abs(angle);
         }
      }
   else {
      if(p2.x < p1.x) {
         angle = 180 - angle;
         }
      }
   return angle;
   };
draw2d.Connection.prototype.getEndAngle = function() {
   var p1 = this.lineSegments.get(this.lineSegments.getSize() - 1).end;
   var p2 = this.lineSegments.get(this.lineSegments.getSize() - 1).start;
   if(this.router instanceof draw2d.BezierConnectionRouter) {
      p2 = this.lineSegments.get(this.lineSegments.getSize() - 5).end;
      }
   var _4ee3 = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
   var angle =- (180 / Math.PI) * Math.asin((p1.y - p2.y) / _4ee3);
   if(angle < 0) {
      if(p2.x < p1.x) {
         angle = Math.abs(angle) + 180;
         }
      else {
         angle = 360 - Math.abs(angle);
         }
      }
   else {
      if(p2.x < p1.x) {
         angle = 180 - angle;
         }
      }
   return angle;
   };
draw2d.Connection.prototype.fireSourcePortRouteEvent = function() {
   var _4ee5 = this.sourcePort.getConnections();
   for(var i = 0; i < _4ee5.getSize(); i++) {
      _4ee5.get(i).paint();
      }
   };
draw2d.Connection.prototype.fireTargetPortRouteEvent = function() {
   var _4ee7 = this.targetPort.getConnections();
   for(var i = 0; i < _4ee7.getSize(); i++) {
      _4ee7.get(i).paint();
      }
   };
draw2d.ConnectionAnchor = function(owner) {
   this.owner = owner;
   };
draw2d.ConnectionAnchor.prototype.type = "ConnectionAnchor";
draw2d.ConnectionAnchor.prototype.getLocation = function(_575c) {
   return this.getReferencePoint();
   };
draw2d.ConnectionAnchor.prototype.getOwner = function() {
   return this.owner;
   };
draw2d.ConnectionAnchor.prototype.setOwner = function(owner) {
   this.owner = owner;
   };
draw2d.ConnectionAnchor.prototype.getBox = function() {
   return this.getOwner().getAbsoluteBounds();
   };
draw2d.ConnectionAnchor.prototype.getReferencePoint = function() {
   if(this.getOwner() == null) {
      return null;
      }
   else {
      return this.getOwner().getAbsolutePosition();
      }
   };
draw2d.ChopboxConnectionAnchor = function(owner) {
   draw2d.ConnectionAnchor.call(this, owner);
   };
draw2d.ChopboxConnectionAnchor.prototype = new draw2d.ConnectionAnchor;
draw2d.ChopboxConnectionAnchor.prototype.type = "ChopboxConnectionAnchor";
draw2d.ChopboxConnectionAnchor.prototype.getLocation = function(_5406) {
   var r = new draw2d.Dimension();
   r.setBounds(this.getBox());
   r.translate( - 1, - 1);
   r.resize(1, 1);
   var _5408 = r.x + r.w / 2;
   var _5409 = r.y + r.h / 2;
   if(r.isEmpty() || (_5406.x == _5408 && _5406.y == _5409)) {
      return new Point(_5408, _5409);
      }
   var dx = _5406.x - _5408;
   var dy = _5406.y - _5409;
   var scale = 0.5 / Math.max(Math.abs(dx) / r.w, Math.abs(dy) / r.h);
   dx *= scale;
   dy *= scale;
   _5408 += dx;
   _5409 += dy;
   return new draw2d.Point(Math.round(_5408), Math.round(_5409));
   };
draw2d.ChopboxConnectionAnchor.prototype.getBox = function() {
   return this.getOwner().getParent().getBounds();
   };
draw2d.ChopboxConnectionAnchor.prototype.getReferencePoint = function() {
   return this.getBox().getCenter();
   };
draw2d.ConnectionDecorator = function() {
   this.color = new draw2d.Color(0, 0, 0);
   this.backgroundColor = new draw2d.Color(250, 250, 250);
   };
draw2d.ConnectionDecorator.prototype.type = "ConnectionDecorator";
draw2d.ConnectionDecorator.prototype.paint = function(g) {
   };
draw2d.ConnectionDecorator.prototype.setColor = function(c) {
   this.color = c;
   };
draw2d.ConnectionDecorator.prototype.setBackgroundColor = function(c) {
   this.backgroundColor = c;
   };
draw2d.ArrowConnectionDecorator = function() {
   };
draw2d.ArrowConnectionDecorator.prototype = new draw2d.ConnectionDecorator;
draw2d.ArrowConnectionDecorator.prototype.type = "ArrowConnectionDecorator";
draw2d.ArrowConnectionDecorator.prototype.paint = function(g) {
   if(this.backgroundColor != null) {
      g.setColor(this.backgroundColor);
      g.fillPolygon([3, 20, 20, 3], [0, 5, - 5, 0]);
      }
   g.setColor(this.color);
   g.setStroke(1);
   g.drawPolygon([3, 20, 20, 3], [0, 5, - 5, 0]);
   };
draw2d.CompartmentFigure = function() {
   draw2d.Node.call(this);
   this.children = new draw2d.ArrayList();
   this.setBorder(new draw2d.LineBorder(1));
   this.dropable = new draw2d.DropTarget(this.html);
   this.dropable.node = this;
   this.dropable.addEventListener("figureenter", function(_431f) {
      _431f.target.node.onFigureEnter(_431f.relatedTarget.node); }
   );
   this.dropable.addEventListener("figureleave", function(_4320) {
      _4320.target.node.onFigureLeave(_4320.relatedTarget.node); }
   );
   this.dropable.addEventListener("figuredrop", function(_4321) {
      _4321.target.node.onFigureDrop(_4321.relatedTarget.node); }
   );
   };
draw2d.CompartmentFigure.prototype = new draw2d.Node;
draw2d.CompartmentFigure.prototype.type = "CompartmentFigure";
draw2d.CompartmentFigure.prototype.onFigureEnter = function(_4322) {
   };
draw2d.CompartmentFigure.prototype.onFigureLeave = function(_4323) {
   };
draw2d.CompartmentFigure.prototype.onFigureDrop = function(_4324) {
   };
draw2d.CompartmentFigure.prototype.getChildren = function() {
   return this.children;
   };
draw2d.CompartmentFigure.prototype.addChild = function(_4325) {
   _4325.setZOrder(this.getZOrder() + 1);
   _4325.setParent(this);
   this.children.add(_4325);
   };
draw2d.CompartmentFigure.prototype.removeChild = function(_4326) {
   _4326.setParent(null);
   this.children.remove(_4326);
   };
draw2d.CompartmentFigure.prototype.setZOrder = function(index) {
   draw2d.Node.prototype.setZOrder.call(this, index);
   for(var i = 0; i < this.children.getSize(); i++) {
      this.children.get(i).setZOrder(index + 1);
      }
   };
draw2d.CompartmentFigure.prototype.setPosition = function(xPos, yPos) {
   var oldX = this.getX();
   var oldY = this.getY();
   draw2d.Node.prototype.setPosition.call(this, xPos, yPos);
   for(var i = 0; i < this.children.getSize(); i++) {
      var child = this.children.get(i);
      child.setPosition(child.getX() + this.getX() - oldX, child.getY() + this.getY() - oldY);
      }
   };
draw2d.CompartmentFigure.prototype.onDrag = function() {
   var oldX = this.getX();
   var oldY = this.getY();
   draw2d.Node.prototype.onDrag.call(this);
   for(var i = 0; i < this.children.getSize(); i++) {
      var child = this.children.get(i);
      child.setPosition(child.getX() + this.getX() - oldX, child.getY() + this.getY() - oldY);
      }
   };
draw2d.Document = function(_477b) {
   this.canvas = _477b;
   };
draw2d.Document.prototype.getFigures = function() {
   var _477c = new draw2d.ArrayList();
   var _477d = this.canvas.figures;
   var _477e = this.canvas.dialogs;
   for(var i = 0; i < _477d.getSize(); i++) {
      var _4780 = _477d.get(i);
      if(_477e.indexOf(_4780) ==- 1 && _4780.getParent() == null &&!(_4780 instanceof draw2d.Window)) {
         _477c.add(_4780);
         }
      }
   return _477c;
   };
draw2d.Document.prototype.getFigure = function(id) {
   return this.canvas.getFigure(id);
   };
draw2d.Document.prototype.getLines = function() {
   return this.canvas.getLines();
   };
draw2d.Annotation = function(msg) {
   this.msg = msg;
   this.color = new draw2d.Color(0, 0, 0);
   this.bgColor = new draw2d.Color(241, 241, 121);
   this.fontSize = 10;
   this.textNode = null;
   draw2d.Figure.call(this);
   };
draw2d.Annotation.prototype = new draw2d.Figure;
draw2d.Annotation.prototype.type = "Annotation";
draw2d.Annotation.prototype.createHTMLElement = function() {
   var item = draw2d.Figure.prototype.createHTMLElement.call(this);
   item.style.color = this.color.getHTMLStyle();
   item.style.backgroundColor = this.bgColor.getHTMLStyle();
   item.style.fontSize = this.fontSize + "pt";
   item.style.width = "auto";
   item.style.height = "auto";
   item.style.margin = "0px";
   item.style.padding = "0px";
   item.onselectstart = function() {
      return false;
      };
   item.unselectable = "on";
   item.style.MozUserSelect = "none";
   item.style.cursor = "default";
   this.textNode = document.createTextNode(this.msg);
   item.appendChild(this.textNode);
   this.disableTextSelection(item);
   return item;
   };
draw2d.Annotation.prototype.onDoubleClick = function() {
   var _53e2 = new draw2d.AnnotationDialog(this);
   this.workflow.showDialog(_53e2);
   };
draw2d.Annotation.prototype.setBackgroundColor = function(color) {
   this.bgColor = color;
   if(this.bgColor != null) {
      this.html.style.backgroundColor = this.bgColor.getHTMLStyle();
      }
   else {
      this.html.style.backgroundColor = "transparent";
      }
   };
draw2d.Annotation.prototype.getBackgroundColor = function() {
   return this.bgColor;
   };
draw2d.Annotation.prototype.setFontSize = function(size) {
   this.fontSize = size;
   this.html.style.fontSize = this.fontSize + "pt";
   };
draw2d.Annotation.prototype.getText = function() {
   return this.msg;
   };
draw2d.Annotation.prototype.setText = function(text) {
   this.msg = text;
   this.html.removeChild(this.textNode);
   this.textNode = document.createTextNode(this.msg);
   this.html.appendChild(this.textNode);
   };
draw2d.Annotation.prototype.setStyledText = function(text) {
   this.msg = text;
   this.html.removeChild(this.textNode);
   this.textNode = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   this.textNode.innerHTML = text;
   this.html.appendChild(this.textNode);
   };
draw2d.ResizeHandle = function(_475d, type) {
   draw2d.Rectangle.call(this, 5, 5);
   this.type = type;
   var _475f = this.getWidth();
   var _4760 = _475f / 2;
   switch(this.type) {
      case 1 : this.setSnapToGridAnchor(new draw2d.Point(_475f, _475f));
      break;
      case 2 : this.setSnapToGridAnchor(new draw2d.Point(_4760, _475f));
      break;
      case 3 : this.setSnapToGridAnchor(new draw2d.Point(0, _475f));
      break;
      case 4 : this.setSnapToGridAnchor(new draw2d.Point(0, _4760));
      break;
      case 5 : this.setSnapToGridAnchor(new draw2d.Point(0, 0));
      break;
      case 6 : this.setSnapToGridAnchor(new draw2d.Point(_4760, 0));
      break;
      case 7 : this.setSnapToGridAnchor(new draw2d.Point(_475f, 0));
      break;
      case 8 : this.setSnapToGridAnchor(new draw2d.Point(_475f, _4760));
      break;
      }
   this.setBackgroundColor(new draw2d.Color(0, 255, 0));
   this.setWorkflow(_475d);
   this.setZOrder(10000);
   };
draw2d.ResizeHandle.prototype = new draw2d.Rectangle;
draw2d.ResizeHandle.prototype.type = "ResizeHandle";
draw2d.ResizeHandle.prototype.getSnapToDirection = function() {
   switch(this.type) {
      case 1 : return draw2d.SnapToHelper.NORTH_WEST;
      case 2 : return draw2d.SnapToHelper.NORTH;
      case 3 : return draw2d.SnapToHelper.NORTH_EAST;
      case 4 : return draw2d.SnapToHelper.EAST;
      case 5 : return draw2d.SnapToHelper.SOUTH_EAST;
      case 6 : return draw2d.SnapToHelper.SOUTH;
      case 7 : return draw2d.SnapToHelper.SOUTH_WEST;
      case 8 : return draw2d.SnapToHelper.WEST;
      }
   };
draw2d.ResizeHandle.prototype.onDragend = function() {
   if(this.commandMove == null) {
      return;
      }
   var _4761 = this.workflow.currentSelection;
   this.commandMove.setPosition(_4761.getX(), _4761.getY());
   this.commandResize.setDimension(_4761.getWidth(), _4761.getHeight());
   this.workflow.getCommandStack().execute(this.commandResize);
   this.workflow.getCommandStack().execute(this.commandMove);
   this.commandMove = null;
   this.commandResize = null;
   this.workflow.hideSnapToHelperLines();
   };
draw2d.ResizeHandle.prototype.setPosition = function(xPos, yPos) {
   this.x = xPos;
   this.y = yPos;
   this.html.style.left = this.x + "px";
   this.html.style.top = this.y + "px";
   };
draw2d.ResizeHandle.prototype.onDragstart = function(x, y) {
   if(!this.canDrag) {
      return false;
      }
   var _4766 = this.workflow.currentSelection;
   this.commandMove = new draw2d.CommandMove(_4766, _4766.getX(), _4766.getY());
   this.commandResize = new draw2d.CommandResize(_4766, _4766.getWidth(), _4766.getHeight());
   return true;
   };
draw2d.ResizeHandle.prototype.onDrag = function() {
   var oldX = this.getX();
   var oldY = this.getY();
   draw2d.Rectangle.prototype.onDrag.call(this);
   var diffX = oldX - this.getX();
   var diffY = oldY - this.getY();
   var _476b = this.workflow.currentSelection.getX();
   var _476c = this.workflow.currentSelection.getY();
   var _476d = this.workflow.currentSelection.getWidth();
   var _476e = this.workflow.currentSelection.getHeight();
   switch(this.type) {
      case 1 : this.workflow.currentSelection.setPosition(_476b - diffX, _476c - diffY);
      this.workflow.currentSelection.setDimension(_476d + diffX, _476e + diffY);
      break;
      case 2 : this.workflow.currentSelection.setPosition(_476b, _476c - diffY);
      this.workflow.currentSelection.setDimension(_476d, _476e + diffY);
      break;
      case 3 : this.workflow.currentSelection.setPosition(_476b, _476c - diffY);
      this.workflow.currentSelection.setDimension(_476d - diffX, _476e + diffY);
      break;
      case 4 : this.workflow.currentSelection.setPosition(_476b, _476c);
      this.workflow.currentSelection.setDimension(_476d - diffX, _476e);
      break;
      case 5 : this.workflow.currentSelection.setPosition(_476b, _476c);
      this.workflow.currentSelection.setDimension(_476d - diffX, _476e - diffY);
      break;
      case 6 : this.workflow.currentSelection.setPosition(_476b, _476c);
      this.workflow.currentSelection.setDimension(_476d, _476e - diffY);
      break;
      case 7 : this.workflow.currentSelection.setPosition(_476b - diffX, _476c);
      this.workflow.currentSelection.setDimension(_476d + diffX, _476e - diffY);
      break;
      case 8 : this.workflow.currentSelection.setPosition(_476b - diffX, _476c);
      this.workflow.currentSelection.setDimension(_476d + diffX, _476e);
      break;
      }
   this.workflow.moveResizeHandles(this.workflow.getCurrentSelection());
   };
draw2d.ResizeHandle.prototype.setCanDrag = function(flag) {
   draw2d.Rectangle.prototype.setCanDrag.call(this, flag);
   if(!flag) {
      this.html.style.cursor = "";
      return;
      }
   switch(this.type) {
      case 1 : this.html.style.cursor = "nw-resize";
      break;
      case 2 : this.html.style.cursor = "s-resize";
      break;
      case 3 : this.html.style.cursor = "ne-resize";
      break;
      case 4 : this.html.style.cursor = "w-resize";
      break;
      case 5 : this.html.style.cursor = "se-resize";
      break;
      case 6 : this.html.style.cursor = "n-resize";
      break;
      case 7 : this.html.style.cursor = "sw-resize";
      break;
      case 8 : this.html.style.cursor = "e-resize";
      break;
      }
   };
draw2d.ResizeHandle.prototype.onKeyDown = function(_4770, ctrl) {
   this.workflow.onKeyDown(_4770, ctrl);
   };
draw2d.ResizeHandle.prototype.fireMoveEvent = function() {
   };
draw2d.LineStartResizeHandle = function(_4ff6) {
   draw2d.Rectangle.call(this);
   this.setDimension(10, 10);
   this.setBackgroundColor(new draw2d.Color(0, 255, 0));
   this.setWorkflow(_4ff6);
   this.setZOrder(10000);
   };
draw2d.LineStartResizeHandle.prototype = new draw2d.Rectangle;
draw2d.LineStartResizeHandle.prototype.type = "LineStartResizeHandle";
draw2d.LineStartResizeHandle.prototype.onDragend = function() {
   var line = this.workflow.currentSelection;
   if(line instanceof draw2d.Connection) {
      var start = line.sourceAnchor.getLocation(line.targetAnchor.getReferencePoint());
      line.setStartPoint(start.x, start.y);
      this.getWorkflow().showLineResizeHandles(line);
      line.setRouter(line.oldRouter);
      }
   else {
      if(this.command == null) {
         return;
         }
      var x1 = line.getStartX();
      var y1 = line.getStartY();
      var x2 = line.getEndX();
      var y2 = line.getEndY();
      this.command.setEndPoints(x1, y1, x2, y2);
      this.getWorkflow().getCommandStack().execute(this.command);
      this.command = null;
      }
   };
draw2d.LineStartResizeHandle.prototype.onDragstart = function(x, y) {
   if(!this.canDrag) {
      return false;
      }
   var line = this.workflow.currentSelection;
   if(line instanceof draw2d.Connection) {
      this.command = new draw2d.CommandReconnect(line);
      line.oldRouter = line.getRouter();
      line.setRouter(new draw2d.NullConnectionRouter());
      }
   else {
      var x1 = line.getStartX();
      var y1 = line.getStartY();
      var x2 = line.getEndX();
      var y2 = line.getEndY();
      this.command = new draw2d.CommandMoveLine(line, x1, y1, x2, y2);
      }
   return true;
   };
draw2d.LineStartResizeHandle.prototype.onDrag = function() {
   var oldX = this.getX();
   var oldY = this.getY();
   draw2d.Rectangle.prototype.onDrag.call(this);
   var diffX = oldX - this.getX();
   var diffY = oldY - this.getY();
   var _5008 = this.workflow.currentSelection.getStartPoint();
   var line = this.workflow.currentSelection;
   line.setStartPoint(_5008.x - diffX, _5008.y - diffY);
   line.isMoving = true;
   };
draw2d.LineStartResizeHandle.prototype.onDrop = function(_500a) {
   var line = this.workflow.currentSelection;
   line.isMoving = false;
   if(line instanceof draw2d.Connection) {
      this.command.setNewPorts(_500a, line.getTarget());
      this.getWorkflow().getCommandStack().execute(this.command);
      }
   this.command = null;
   };
draw2d.LineStartResizeHandle.prototype.onKeyDown = function(_500c, ctrl) {
   if(this.workflow != null) {
      this.workflow.onKeyDown(_500c, ctrl);
      }
   };
draw2d.LineStartResizeHandle.prototype.fireMoveEvent = function() {
   };
draw2d.LineEndResizeHandle = function(_4a29) {
   draw2d.Rectangle.call(this);
   this.setDimension(10, 10);
   this.setBackgroundColor(new draw2d.Color(0, 255, 0));
   this.setWorkflow(_4a29);
   this.setZOrder(10000);
   };
draw2d.LineEndResizeHandle.prototype = new draw2d.Rectangle;
draw2d.LineEndResizeHandle.prototype.type = "LineEndResizeHandle";
draw2d.LineEndResizeHandle.prototype.onDragend = function() {
   var line = this.workflow.currentSelection;
   if(line instanceof draw2d.Connection) {
      var end = line.targetAnchor.getLocation(line.sourceAnchor.getReferencePoint());
      line.setEndPoint(end.x, end.y);
      this.getWorkflow().showLineResizeHandles(line);
      line.setRouter(line.oldRouter);
      }
   else {
      if(this.command == null) {
         return;
         }
      var x1 = line.getStartX();
      var y1 = line.getStartY();
      var x2 = line.getEndX();
      var y2 = line.getEndY();
      this.command.setEndPoints(x1, y1, x2, y2);
      this.workflow.getCommandStack().execute(this.command);
      this.command = null;
      }
   };
draw2d.LineEndResizeHandle.prototype.onDragstart = function(x, y) {
   if(!this.canDrag) {
      return false;
      }
   var line = this.workflow.currentSelection;
   if(line instanceof draw2d.Connection) {
      this.command = new draw2d.CommandReconnect(line);
      line.oldRouter = line.getRouter();
      line.setRouter(new draw2d.NullConnectionRouter());
      }
   else {
      var x1 = line.getStartX();
      var y1 = line.getStartY();
      var x2 = line.getEndX();
      var y2 = line.getEndY();
      this.command = new draw2d.CommandMoveLine(line, x1, y1, x2, y2);
      }
   return true;
   };
draw2d.LineEndResizeHandle.prototype.onDrag = function() {
   var oldX = this.getX();
   var oldY = this.getY();
   draw2d.Rectangle.prototype.onDrag.call(this);
   var diffX = oldX - this.getX();
   var diffY = oldY - this.getY();
   var _4a3b = this.workflow.currentSelection.getEndPoint();
   var line = this.workflow.currentSelection;
   line.setEndPoint(_4a3b.x - diffX, _4a3b.y - diffY);
   line.isMoving = true;
   };
draw2d.LineEndResizeHandle.prototype.onDrop = function(_4a3d) {
   var line = this.workflow.currentSelection;
   line.isMoving = false;
   if(line instanceof draw2d.Connection) {
      this.command.setNewPorts(line.getSource(), _4a3d);
      this.getWorkflow().getCommandStack().execute(this.command);
      }
   this.command = null;
   };
draw2d.LineEndResizeHandle.prototype.onKeyDown = function(_4a3f) {
   if(this.workflow != null) {
      this.workflow.onKeyDown(_4a3f);
      }
   };
draw2d.LineEndResizeHandle.prototype.fireMoveEvent = function() {
   };
draw2d.Canvas = function(_52e3) {
   if(_52e3) {
      this.construct(_52e3);
      }
   this.enableSmoothFigureHandling = false;
   this.canvasLines = new draw2d.ArrayList();
   };
draw2d.Canvas.prototype.type = "Canvas";
draw2d.Canvas.prototype.construct = function(_52e4) {
   this.canvasId = _52e4;
   this.html = document.getElementById(this.canvasId);
   this.scrollArea = document.body.parentNode;
   };
draw2d.Canvas.prototype.setViewPort = function(divId) {
   this.scrollArea = document.getElementById(divId);
   };
draw2d.Canvas.prototype.addFigure = function(_52e6, xPos, yPos, _52e9) {
   if(this.enableSmoothFigureHandling == true) {
      if(_52e6.timer <= 0) {
         _52e6.setAlpha(0.001);
         }
      var _52ea = _52e6;
      var _52eb = function() {
         if(_52ea.alpha < 1) {
            _52ea.setAlpha(Math.min(1, _52ea.alpha + 0.05));
            }
         else {
            window.clearInterval(_52ea.timer);
            _52ea.timer =- 1;
            }
         };
      if(_52ea.timer > 0) {
         window.clearInterval(_52ea.timer);
         }
      _52ea.timer = window.setInterval(_52eb, 30);
      }
   _52e6.setCanvas(this);
   if(xPos && yPos) {
      _52e6.setPosition(xPos, yPos);
      }
   if(_52e6 instanceof draw2d.Line) {
      this.canvasLines.add(_52e6);
      this.html.appendChild(_52e6.getHTMLElement());
      }
   else {
      var obj = this.canvasLines.getFirstElement();
      if(obj == null) {
         this.html.appendChild(_52e6.getHTMLElement());
         }
      else {
         this.html.insertBefore(_52e6.getHTMLElement(), obj.getHTMLElement());
         }
      }
   if(!_52e9) {
      _52e6.paint();
      }
   };
draw2d.Canvas.prototype.removeFigure = function(_52ed) {
   if(this.enableSmoothFigureHandling == true) {
      var oThis = this;
      var _52ef = _52ed;
      var _52f0 = function() {
         if(_52ef.alpha > 0) {
            _52ef.setAlpha(Math.max(0, _52ef.alpha - 0.05));
            }
         else {
            window.clearInterval(_52ef.timer);
            _52ef.timer =- 1;
            oThis.html.removeChild(_52ef.html);
            _52ef.setCanvas(null);
            }
         };
      if(_52ef.timer > 0) {
         window.clearInterval(_52ef.timer);
         }
      _52ef.timer = window.setInterval(_52f0, 20);
      }
   else {
      this.html.removeChild(_52ed.html);
      _52ed.setCanvas(null);
      }
   if(_52ed instanceof draw2d.Line) {
      this.canvasLines.remove(_52ed);
      }
   };
draw2d.Canvas.prototype.getEnableSmoothFigureHandling = function() {
   return this.enableSmoothFigureHandling;
   };
draw2d.Canvas.prototype.setEnableSmoothFigureHandling = function(flag) {
   this.enableSmoothFigureHandling = flag;
   };
draw2d.Canvas.prototype.getWidth = function() {
   return parseInt(this.html.style.width);
   };
draw2d.Canvas.prototype.getHeight = function() {
   return parseInt(this.html.style.height);
   };
draw2d.Canvas.prototype.setBackgroundImage = function(_52f2, _52f3) {
   if(_52f2 != null) {
      if(_52f3) {
         this.html.style.background = "transparent url(" + _52f2 + ") ";
         }
      else {
         this.html.style.background = "transparent url(" + _52f2 + ") no-repeat";
         }
      }
   else {
      this.html.style.background = "transparent";
      }
   };
draw2d.Canvas.prototype.getY = function() {
   return this.y;
   };
draw2d.Canvas.prototype.getX = function() {
   return this.x;
   };
draw2d.Canvas.prototype.getAbsoluteY = function() {
   var el = this.html;
   var ot = el.offsetTop;
   while((el = el.offsetParent) != null) {
      ot += el.offsetTop;
      }
   return ot;
   };
draw2d.Canvas.prototype.getAbsoluteX = function() {
   var el = this.html;
   var ol = el.offsetLeft;
   while((el = el.offsetParent) != null) {
      ol += el.offsetLeft;
      }
   return ol;
   };
draw2d.Canvas.prototype.getScrollLeft = function() {
   return this.scrollArea.scrollLeft;
   };
draw2d.Canvas.prototype.getScrollTop = function() {
   return this.scrollArea.scrollTop;
   };
draw2d.Workflow = function(id) {
   if(!id) {
      return;
      }
   this.gridWidthX = 10;
   this.gridWidthY = 10;
   this.snapToGridHelper = null;
   this.verticalSnapToHelperLine = null;
   this.horizontalSnapToHelperLine = null;
   this.figures = new draw2d.ArrayList();
   this.lines = new draw2d.ArrayList();
   this.commonPorts = new draw2d.ArrayList();
   this.dropTargets = new draw2d.ArrayList();
   this.compartments = new draw2d.ArrayList();
   this.selectionListeners = new draw2d.ArrayList();
   this.dialogs = new draw2d.ArrayList();
   this.toolPalette = null;
   this.dragging = false;
   this.tooltip = null;
   this.draggingLine = null;
   this.commandStack = new draw2d.CommandStack();
   this.oldScrollPosLeft = 0;
   this.oldScrollPosTop = 0;
   this.currentSelection = null;
   this.currentMenu = null;
   this.connectionLine = new draw2d.Line();
   this.resizeHandleStart = new draw2d.LineStartResizeHandle(this);
   this.resizeHandleEnd = new draw2d.LineEndResizeHandle(this);
   this.resizeHandle1 = new draw2d.ResizeHandle(this, 1);
   this.resizeHandle2 = new draw2d.ResizeHandle(this, 2);
   this.resizeHandle3 = new draw2d.ResizeHandle(this, 3);
   this.resizeHandle4 = new draw2d.ResizeHandle(this, 4);
   this.resizeHandle5 = new draw2d.ResizeHandle(this, 5);
   this.resizeHandle6 = new draw2d.ResizeHandle(this, 6);
   this.resizeHandle7 = new draw2d.ResizeHandle(this, 7);
   this.resizeHandle8 = new draw2d.ResizeHandle(this, 8);
   this.resizeHandleHalfWidth = parseInt(this.resizeHandle2.getWidth() / 2);
   draw2d.Canvas.call(this, id);
   this.setPanning(false);
   if(this.html != null) {
      this.html.style.backgroundImage = "url(grid_10.png)";
      oThis = this;
      this.html.tabIndex = "0";
      var _47f2 = function() {
         var _47f3 = arguments[0] || window.event;
         var diffX = _47f3.clientX;
         var diffY = _47f3.clientY;
         var _47f6 = oThis.getScrollLeft();
         var _47f7 = oThis.getScrollTop();
         var _47f8 = oThis.getAbsoluteX();
         var _47f9 = oThis.getAbsoluteY();
         if(oThis.getBestFigure(diffX + _47f6 - _47f8, diffY + _47f7 - _47f9) != null) {
            return;
            }
         var line = oThis.getBestLine(diffX + _47f6 - _47f8, diffY + _47f7 - _47f9, null);
         if(line != null) {
            line.onContextMenu(diffX + _47f6 - _47f8, diffY + _47f7 - _47f9);
            }
         else {
            oThis.onContextMenu(diffX + _47f6 - _47f8, diffY + _47f7 - _47f9);
            }
         };
      this.html.oncontextmenu = function() {
         return false;
         };
      var oThis = this;
      var _47fc = function(event) {
         var ctrl = event.ctrlKey;
         oThis.onKeyDown(event.keyCode, ctrl);
         };
      var _47ff = function() {
         var _4800 = arguments[0] || window.event;
         var diffX = _4800.clientX;
         var diffY = _4800.clientY;
         var _4803 = oThis.getScrollLeft();
         var _4804 = oThis.getScrollTop();
         var _4805 = oThis.getAbsoluteX();
         var _4806 = oThis.getAbsoluteY();
         oThis.onMouseDown(diffX + _4803 - _4805, diffY + _4804 - _4806);
         };
      var _4807 = function() {
         var _4808 = arguments[0] || window.event;
         if(oThis.currentMenu != null) {
            oThis.removeFigure(oThis.currentMenu);
            oThis.currentMenu = null;
            }
         if(_4808.button == 2) {
            return;
            }
         var diffX = _4808.clientX;
         var diffY = _4808.clientY;
         var _480b = oThis.getScrollLeft();
         var _480c = oThis.getScrollTop();
         var _480d = oThis.getAbsoluteX();
         var _480e = oThis.getAbsoluteY();
         oThis.onMouseUp(diffX + _480b - _480d, diffY + _480c - _480e);
         };
      var _480f = function() {
         var _4810 = arguments[0] || window.event;
         var diffX = _4810.clientX;
         var diffY = _4810.clientY;
         var _4813 = oThis.getScrollLeft();
         var _4814 = oThis.getScrollTop();
         var _4815 = oThis.getAbsoluteX();
         var _4816 = oThis.getAbsoluteY();
         oThis.currentMouseX = diffX + _4813 - _4815;
         oThis.currentMouseY = diffY + _4814 - _4816;
         var obj = oThis.getBestFigure(oThis.currentMouseX, oThis.currentMouseY);
         if(draw2d.Drag.currentHover != null && obj == null) {
            var _4818 = new draw2d.DragDropEvent();
            _4818.initDragDropEvent("mouseleave", false, oThis);
            draw2d.Drag.currentHover.dispatchEvent(_4818);
            }
         else {
            var diffX = _4810.clientX;
            var diffY = _4810.clientY;
            var _4813 = oThis.getScrollLeft();
            var _4814 = oThis.getScrollTop();
            var _4815 = oThis.getAbsoluteX();
            var _4816 = oThis.getAbsoluteY();
            oThis.onMouseMove(diffX + _4813 - _4815, diffY + _4814 - _4816);
            }
         if(obj == null) {
            draw2d.Drag.currentHover = null;
            }
         if(oThis.tooltip != null) {
            if(Math.abs(oThis.currentTooltipX - oThis.currentMouseX) > 10 || Math.abs(oThis.currentTooltipY - oThis.currentMouseY) > 10) {
               oThis.showTooltip(null);
               }
            }
         };
      var _4819 = function(_481a) {
         var _481a = arguments[0] || window.event;
         var diffX = _481a.clientX;
         var diffY = _481a.clientY;
         var _481d = oThis.getScrollLeft();
         var _481e = oThis.getScrollTop();
         var _481f = oThis.getAbsoluteX();
         var _4820 = oThis.getAbsoluteY();
         var line = oThis.getBestLine(diffX + _481d - _481f, diffY + _481e - _4820, null);
         if(line != null) {
            line.onDoubleClick();
            }
         };
      if(this.html.addEventListener) {
         this.html.addEventListener("contextmenu", _47f2, false);
         this.html.addEventListener("mousemove", _480f, false);
         this.html.addEventListener("mouseup", _4807, false);
         this.html.addEventListener("mousedown", _47ff, false);
         this.html.addEventListener("keydown", _47fc, false);
         this.html.addEventListener("dblclick", _4819, false);
         }
      else {
         if(this.html.attachEvent) {
            this.html.attachEvent("oncontextmenu", _47f2);
            this.html.attachEvent("onmousemove", _480f);
            this.html.attachEvent("onmousedown", _47ff);
            this.html.attachEvent("onmouseup", _4807);
            this.html.attachEvent("onkeydown", _47fc);
            this.html.attachEvent("ondblclick", _4819);
            }
         else {
            throw new Error("Open-jACOB Draw2D not supported in this browser.");
            }
         }
      }
   };
draw2d.Workflow.prototype = new draw2d.Canvas;
draw2d.Workflow.prototype.type = "Workflow";
draw2d.Workflow.COLOR_GREEN = new draw2d.Color(0, 255, 0);
draw2d.Workflow.prototype.onScroll = function() {
   var _4822 = this.getScrollLeft();
   var _4823 = this.getScrollTop();
   var _4824 = _4822 - this.oldScrollPosLeft;
   var _4825 = _4823 - this.oldScrollPosTop;
   for(var i = 0; i < this.figures.getSize(); i++) {
      var _4827 = this.figures.get(i);
      if(_4827.hasFixedPosition && _4827.hasFixedPosition() == true) {
         _4827.setPosition(_4827.getX() + _4824, _4827.getY() + _4825);
         }
      }
   this.oldScrollPosLeft = _4822;
   this.oldScrollPosTop = _4823;
   };
draw2d.Workflow.prototype.setPanning = function(flag) {
   this.panning = flag;
   if(flag) {
      this.html.style.cursor = "move";
      }
   else {
      this.html.style.cursor = "default";
      }
   };
draw2d.Workflow.prototype.scrollTo = function(x, y, fast) {
   if(fast) {
      this.scrollArea.scrollLeft = x;
      this.scrollArea.scrollTop = y;
      }
   else {
      var steps = 40;
      var xStep = (x - this.getScrollLeft()) / steps;
      var yStep = (y - this.getScrollTop()) / steps;
      var oldX = this.getScrollLeft();
      var oldY = this.getScrollTop();
      for(var i = 0; i < steps; i++) {
         this.scrollArea.scrollLeft = oldX + (xStep * i);
         this.scrollArea.scrollTop = oldY + (yStep * i);
         }
      }
   };
draw2d.Workflow.prototype.showTooltip = function(_4832, _4833) {
   if(this.tooltip != null) {
      this.removeFigure(this.tooltip);
      this.tooltip = null;
      if(this.tooltipTimer >= 0) {
         window.clearTimeout(this.tooltipTimer);
         this.tooltipTimer =- 1;
         }
      }
   this.tooltip = _4832;
   if(this.tooltip != null) {
      this.currentTooltipX = this.currentMouseX;
      this.currentTooltipY = this.currentMouseY;
      this.addFigure(this.tooltip, this.currentTooltipX + 10, this.currentTooltipY + 10);
      var oThis = this;
      var _4835 = function() {
         oThis.tooltipTimer =- 1;
         oThis.showTooltip(null);
         };
      if(_4833 == true) {
         this.tooltipTimer = window.setTimeout(_4835, 5000);
         }
      }
   };
draw2d.Workflow.prototype.showDialog = function(_4836, xPos, yPos) {
   if(xPos) {
      this.addFigure(_4836, xPos, yPos);
      }
   else {
      this.addFigure(_4836, 200, 100);
      }
   this.dialogs.add(_4836);
   };
draw2d.Workflow.prototype.showMenu = function(menu, xPos, yPos) {
   if(this.menu != null) {
      this.html.removeChild(this.menu.getHTMLElement());
      this.menu.setWorkflow();
      }
   this.menu = menu;
   if(this.menu != null) {
      this.menu.setWorkflow(this);
      this.menu.setPosition(xPos, yPos);
      this.html.appendChild(this.menu.getHTMLElement());
      this.menu.paint();
      }
   };
draw2d.Workflow.prototype.onContextMenu = function(x, y) {
   var menu = this.getContextMenu();
   if(menu != null) {
      this.showMenu(menu, x, y);
      }
   };
draw2d.Workflow.prototype.getContextMenu = function() {
   return null;
   };
draw2d.Workflow.prototype.setToolWindow = function(_483f, x, y) {
   this.toolPalette = _483f;
   if(y) {
      this.addFigure(_483f, x, y);
      }
   else {
      this.addFigure(_483f, 20, 20);
      }
   this.dialogs.add(_483f);
   };
draw2d.Workflow.prototype.setSnapToGrid = function(flag) {
   if(flag) {
      this.snapToGridHelper = new draw2d.SnapToGrid(this);
      }
   else {
      this.snapToGridHelper = null;
      }
   };
draw2d.Workflow.prototype.setSnapToGeometry = function(flag) {
   if(flag) {
      this.snapToGeometryHelper = new draw2d.SnapToGeometry(this);
      }
   else {
      this.snapToGeometryHelper = null;
      }
   };
draw2d.Workflow.prototype.setGridWidth = function(dx, dy) {
   this.gridWidthX = dx;
   this.gridWidthY = dy;
   };
draw2d.Workflow.prototype.addFigure = function(_4846, xPos, yPos) {
   draw2d.Canvas.prototype.addFigure.call(this, _4846, xPos, yPos, true);
   _4846.setWorkflow(this);
   var _4849 = this;
   if(_4846 instanceof draw2d.CompartmentFigure) {
      this.compartments.add(_4846);
      }
   if(_4846 instanceof draw2d.Line) {
      this.lines.add(_4846);
      }
   else {
      this.figures.add(_4846);
      _4846.draggable.addEventListener("dragend", function(_484a) {
         }
      );
      _4846.draggable.addEventListener("dragstart", function(_484b) {
         var _484c = _4849.getFigure(_484b.target.element.id); if(_484c == null) {
            return; }
         if(_484c.isSelectable() == false) {
            return; }
         _4849.showResizeHandles(_484c); _4849.setCurrentSelection(_484c); }
      );
      _4846.draggable.addEventListener("drag", function(_484d) {
         var _484e = _4849.getFigure(_484d.target.element.id); if(_484e == null) {
            return; }
         if(_484e.isSelectable() == false) {
            return; }
         _4849.moveResizeHandles(_484e); }
      );
      }
   _4846.paint();
   this.setDocumentDirty();
   };
draw2d.Workflow.prototype.removeFigure = function(_484f) {
   draw2d.Canvas.prototype.removeFigure.call(this, _484f);
   this.figures.remove(_484f);
   this.lines.remove(_484f);
   this.dialogs.remove(_484f);
   _484f.setWorkflow(null);
   if(_484f instanceof draw2d.CompartmentFigure) {
      this.compartments.remove(_484f);
      }
   if(_484f instanceof draw2d.Connection) {
      _484f.disconnect();
      }
   if(this.currentSelection == _484f) {
      this.setCurrentSelection(null);
      }
   this.setDocumentDirty();
   };
draw2d.Workflow.prototype.moveFront = function(_4850) {
   this.html.removeChild(_4850.getHTMLElement());
   this.html.appendChild(_4850.getHTMLElement());
   };
draw2d.Workflow.prototype.moveBack = function(_4851) {
   this.html.removeChild(_4851.getHTMLElement());
   this.html.insertBefore(_4851.getHTMLElement(), this.html.firstChild);
   };
draw2d.Workflow.prototype.getBestCompartmentFigure = function(x, y, _4854) {
   var _4855 = null;
   for(var i = 0; i < this.figures.getSize(); i++) {
      var _4857 = this.figures.get(i);
      if((_4857 instanceof draw2d.CompartmentFigure) && _4857.isOver(x, y) == true && _4857 != _4854) {
         if(_4855 == null) {
            _4855 = _4857;
            }
         else {
            if(_4855.getZOrder() < _4857.getZOrder()) {
               _4855 = _4857;
               }
            }
         }
      }
   return _4855;
   };
draw2d.Workflow.prototype.getBestFigure = function(x, y, _485a) {
   var _485b = null;
   for(var i = 0; i < this.figures.getSize(); i++) {
      var _485d = this.figures.get(i);
      if(_485d.isOver(x, y) == true && _485d != _485a) {
         if(_485b == null) {
            _485b = _485d;
            }
         else {
            if(_485b.getZOrder() < _485d.getZOrder()) {
               _485b = _485d;
               }
            }
         }
      }
   return _485b;
   };
draw2d.Workflow.prototype.getBestLine = function(x, y, _4860) {
   var _4861 = null;
   for(var i = 0; i < this.lines.getSize(); i++) {
      var line = this.lines.get(i);
      if(line.containsPoint(x, y) == true && line != _4860) {
         if(_4861 == null) {
            _4861 = line;
            }
         else {
            if(_4861.getZOrder() < line.getZOrder()) {
               _4861 = line;
               }
            }
         }
      }
   return _4861;
   };
draw2d.Workflow.prototype.getFigure = function(id) {
   for(var i = 0; i < this.figures.getSize(); i++) {
      var _4866 = this.figures.get(i);
      if(_4866.id == id) {
         return _4866;
         }
      }
   return null;
   };
draw2d.Workflow.prototype.getFigures = function() {
   return this.figures;
   };
draw2d.Workflow.prototype.getDocument = function() {
   return new draw2d.Document(this);
   };
draw2d.Workflow.prototype.addSelectionListener = function(w) {
   this.selectionListeners.add(w);
   };
draw2d.Workflow.prototype.removeSelectionListener = function(w) {
   this.selectionListeners.remove(w);
   };
draw2d.Workflow.prototype.setCurrentSelection = function(_4869) {
   if(_4869 == null) {
      this.hideResizeHandles();
      this.hideLineResizeHandles();
      }
   this.currentSelection = _4869;
   for(var i = 0; i < this.selectionListeners.getSize(); i++) {
      var w = this.selectionListeners.get(i);
      if(w != null && w.onSelectionChanged) {
         w.onSelectionChanged(this.currentSelection);
         }
      }
   };
draw2d.Workflow.prototype.getCurrentSelection = function() {
   return this.currentSelection;
   };
draw2d.Workflow.prototype.getLines = function() {
   return this.lines;
   };
draw2d.Workflow.prototype.registerPort = function(port) {
   port.draggable.targets = this.dropTargets;
   this.commonPorts.add(port);
   this.dropTargets.add(port.dropable);
   };
draw2d.Workflow.prototype.unregisterPort = function(port) {
   port.draggable.targets = null;
   this.commonPorts.remove(port);
   this.dropTargets.remove(port.dropable);
   };
draw2d.Workflow.prototype.getCommandStack = function() {
   return this.commandStack;
   };
draw2d.Workflow.prototype.showConnectionLine = function(x1, y1, x2, y2) {
   this.connectionLine.setStartPoint(x1, y1);
   this.connectionLine.setEndPoint(x2, y2);
   if(this.connectionLine.canvas == null) {
      draw2d.Canvas.prototype.addFigure.call(this, this.connectionLine);
      }
   };
draw2d.Workflow.prototype.hideConnectionLine = function() {
   if(this.connectionLine.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.connectionLine);
      }
   };
draw2d.Workflow.prototype.showLineResizeHandles = function(_4872) {
   var _4873 = this.resizeHandleStart.getWidth() / 2;
   var _4874 = this.resizeHandleStart.getHeight() / 2;
   var _4875 = _4872.getStartPoint();
   var _4876 = _4872.getEndPoint();
   draw2d.Canvas.prototype.addFigure.call(this, this.resizeHandleStart, _4875.x - _4873, _4875.y - _4873);
   draw2d.Canvas.prototype.addFigure.call(this, this.resizeHandleEnd, _4876.x - _4873, _4876.y - _4873);
   this.resizeHandleStart.setCanDrag(_4872.isResizeable());
   this.resizeHandleEnd.setCanDrag(_4872.isResizeable());
   if(_4872.isResizeable()) {
      this.resizeHandleStart.setBackgroundColor(draw2d.Workflow.COLOR_GREEN);
      this.resizeHandleEnd.setBackgroundColor(draw2d.Workflow.COLOR_GREEN);
      this.resizeHandleStart.draggable.targets = this.dropTargets;
      this.resizeHandleEnd.draggable.targets = this.dropTargets;
      }
   else {
      this.resizeHandleStart.setBackgroundColor(null);
      this.resizeHandleEnd.setBackgroundColor(null);
      }
   };
draw2d.Workflow.prototype.hideLineResizeHandles = function() {
   if(this.resizeHandleStart.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.resizeHandleStart);
      }
   if(this.resizeHandleEnd.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.resizeHandleEnd);
      }
   };
draw2d.Workflow.prototype.showResizeHandles = function(_4877) {
   this.hideLineResizeHandles();
   this.hideResizeHandles();
   if(this.getEnableSmoothFigureHandling() == true && this.getCurrentSelection() != _4877) {
      this.resizeHandle1.setAlpha(0.01);
      this.resizeHandle2.setAlpha(0.01);
      this.resizeHandle3.setAlpha(0.01);
      this.resizeHandle4.setAlpha(0.01);
      this.resizeHandle5.setAlpha(0.01);
      this.resizeHandle6.setAlpha(0.01);
      this.resizeHandle7.setAlpha(0.01);
      this.resizeHandle8.setAlpha(0.01);
      }
   var _4878 = this.resizeHandle1.getWidth();
   var _4879 = this.resizeHandle1.getHeight();
   var _487a = _4877.getHeight();
   var _487b = _4877.getWidth();
   var xPos = _4877.getX();
   var yPos = _4877.getY();
   draw2d.Canvas.prototype.addFigure.call(this, this.resizeHandle1, xPos - _4878, yPos - _4879);
   draw2d.Canvas.prototype.addFigure.call(this, this.resizeHandle3, xPos + _487b, yPos - _4879);
   draw2d.Canvas.prototype.addFigure.call(this, this.resizeHandle5, xPos + _487b, yPos + _487a);
   draw2d.Canvas.prototype.addFigure.call(this, this.resizeHandle7, xPos - _4878, yPos + _487a);
   this.moveFront(this.resizeHandle1);
   this.moveFront(this.resizeHandle3);
   this.moveFront(this.resizeHandle5);
   this.moveFront(this.resizeHandle7);
   this.resizeHandle1.setCanDrag(_4877.isResizeable());
   this.resizeHandle3.setCanDrag(_4877.isResizeable());
   this.resizeHandle5.setCanDrag(_4877.isResizeable());
   this.resizeHandle7.setCanDrag(_4877.isResizeable());
   if(_4877.isResizeable()) {
      var green = new draw2d.Color(0, 255, 0);
      this.resizeHandle1.setBackgroundColor(green);
      this.resizeHandle3.setBackgroundColor(green);
      this.resizeHandle5.setBackgroundColor(green);
      this.resizeHandle7.setBackgroundColor(green);
      }
   else {
      this.resizeHandle1.setBackgroundColor(null);
      this.resizeHandle3.setBackgroundColor(null);
      this.resizeHandle5.setBackgroundColor(null);
      this.resizeHandle7.setBackgroundColor(null);
      }
   if(_4877.isStrechable() && _4877.isResizeable()) {
      this.resizeHandle2.setCanDrag(_4877.isResizeable());
      this.resizeHandle4.setCanDrag(_4877.isResizeable());
      this.resizeHandle6.setCanDrag(_4877.isResizeable());
      this.resizeHandle8.setCanDrag(_4877.isResizeable());
      draw2d.Canvas.prototype.addFigure.call(this, this.resizeHandle2, xPos + (_487b / 2) - this.resizeHandleHalfWidth, yPos - _4879);
      draw2d.Canvas.prototype.addFigure.call(this, this.resizeHandle4, xPos + _487b, yPos + (_487a / 2) - (_4879 / 2));
      draw2d.Canvas.prototype.addFigure.call(this, this.resizeHandle6, xPos + (_487b / 2) - this.resizeHandleHalfWidth, yPos + _487a);
      draw2d.Canvas.prototype.addFigure.call(this, this.resizeHandle8, xPos - _4878, yPos + (_487a / 2) - (_4879 / 2));
      this.moveFront(this.resizeHandle2);
      this.moveFront(this.resizeHandle4);
      this.moveFront(this.resizeHandle6);
      this.moveFront(this.resizeHandle8);
      }
   };
draw2d.Workflow.prototype.hideResizeHandles = function() {
   if(this.resizeHandle1.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.resizeHandle1);
      }
   if(this.resizeHandle2.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.resizeHandle2);
      }
   if(this.resizeHandle3.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.resizeHandle3);
      }
   if(this.resizeHandle4.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.resizeHandle4);
      }
   if(this.resizeHandle5.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.resizeHandle5);
      }
   if(this.resizeHandle6.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.resizeHandle6);
      }
   if(this.resizeHandle7.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.resizeHandle7);
      }
   if(this.resizeHandle8.canvas != null) {
      draw2d.Canvas.prototype.removeFigure.call(this, this.resizeHandle8);
      }
   };
draw2d.Workflow.prototype.moveResizeHandles = function(_487f) {
   var _4880 = this.resizeHandle1.getWidth();
   var _4881 = this.resizeHandle1.getHeight();
   var _4882 = _487f.getHeight();
   var _4883 = _487f.getWidth();
   var xPos = _487f.getX();
   var yPos = _487f.getY();
   this.resizeHandle1.setPosition(xPos - _4880, yPos - _4881);
   this.resizeHandle3.setPosition(xPos + _4883, yPos - _4881);
   this.resizeHandle5.setPosition(xPos + _4883, yPos + _4882);
   this.resizeHandle7.setPosition(xPos - _4880, yPos + _4882);
   if(_487f.isStrechable()) {
      this.resizeHandle2.setPosition(xPos + (_4883 / 2) - this.resizeHandleHalfWidth, yPos - _4881);
      this.resizeHandle4.setPosition(xPos + _4883, yPos + (_4882 / 2) - (_4881 / 2));
      this.resizeHandle6.setPosition(xPos + (_4883 / 2) - this.resizeHandleHalfWidth, yPos + _4882);
      this.resizeHandle8.setPosition(xPos - _4880, yPos + (_4882 / 2) - (_4881 / 2));
      }
   };
draw2d.Workflow.prototype.onMouseDown = function(x, y) {
   this.dragging = true;
   this.mouseDownPosX = x;
   this.mouseDownPosY = y;
   if(this.toolPalette != null && this.toolPalette.getActiveTool() != null) {
      this.toolPalette.getActiveTool().execute(x, y);
      }
   this.setCurrentSelection(null);
   this.showMenu(null);
   var size = this.getLines().getSize();
   for(var i = 0; i < size; i++) {
      var line = this.lines.get(i);
      if(line.containsPoint(x, y) && line.isSelectable()) {
         this.hideResizeHandles();
         this.setCurrentSelection(line);
         this.showLineResizeHandles(this.currentSelection);
         if(line instanceof draw2d.Line &&!(line instanceof draw2d.Connection)) {
            this.draggingLine = line;
            }
         break;
         }
      }
   };
draw2d.Workflow.prototype.onMouseUp = function(x, y) {
   this.dragging = false;
   this.draggingLine = null;
   };
draw2d.Workflow.prototype.onMouseMove = function(x, y) {
   if(this.dragging == true && this.draggingLine != null) {
      var diffX = x - this.mouseDownPosX;
      var diffY = y - this.mouseDownPosY;
      this.draggingLine.startX = this.draggingLine.getStartX() + diffX;
      this.draggingLine.startY = this.draggingLine.getStartY() + diffY;
      this.draggingLine.setEndPoint(this.draggingLine.getEndX() + diffX, this.draggingLine.getEndY() + diffY);
      this.mouseDownPosX = x;
      this.mouseDownPosY = y;
      this.showLineResizeHandles(this.currentSelection);
      }
   else {
      if(this.dragging == true && this.panning == true) {
         var diffX = x - this.mouseDownPosX;
         var diffY = y - this.mouseDownPosY;
         this.scrollTo(this.getScrollLeft() - diffX, this.getScrollTop() - diffY, true);
         this.onScroll();
         }
      }
   };
draw2d.Workflow.prototype.onKeyDown = function(_4891, ctrl) {
   if(_4891 == 46 && this.currentSelection != null && this.currentSelection.isDeleteable()) {
      this.commandStack.execute(new draw2d.CommandDelete(this.currentSelection));
      }
   else {
      if(_4891 == 90 && ctrl) {
         this.commandStack.undo();
         }
      else {
         if(_4891 == 89 && ctrl) {
            this.commandStack.redo();
            }
         }
      }
   };
draw2d.Workflow.prototype.setDocumentDirty = function() {
   for(var i = 0; i < this.dialogs.getSize(); i++) {
      var d = this.dialogs.get(i);
      if(d != null && d.onSetDocumentDirty) {
         d.onSetDocumentDirty();
         }
      }
   if(this.snapToGeometryHelper != null) {
      this.snapToGeometryHelper.onSetDocumentDirty();
      }
   if(this.snapToGridHelper != null) {
      this.snapToGridHelper.onSetDocumentDirty();
      }
   };
draw2d.Workflow.prototype.snapToHelper = function(_4895, pos) {
   if(this.snapToGeometryHelper != null) {
      if(_4895 instanceof draw2d.ResizeHandle) {
         var _4897 = _4895.getSnapToGridAnchor();
         pos.x += _4897.x;
         pos.y += _4897.y;
         var _4898 = new draw2d.Point(pos.x, pos.y);
         var _4899 = _4895.getSnapToDirection();
         var _489a = this.snapToGeometryHelper.snapPoint(_4899, pos, _4898);
         if((_4899 & draw2d.SnapToHelper.EAST_WEST) &&!(_489a & draw2d.SnapToHelper.EAST_WEST)) {
            this.showSnapToHelperLineVertical(_4898.x);
            }
         else {
            this.hideSnapToHelperLineVertical();
            }
         if((_4899 & draw2d.SnapToHelper.NORTH_SOUTH) &&!(_489a & draw2d.SnapToHelper.NORTH_SOUTH)) {
            this.showSnapToHelperLineHorizontal(_4898.y);
            }
         else {
            this.hideSnapToHelperLineHorizontal();
            }
         _4898.x -= _4897.x;
         _4898.y -= _4897.y;
         return _4898;
         }
      else {
         var _489b = new draw2d.Dimension(pos.x, pos.y, _4895.getWidth(), _4895.getHeight());
         var _4898 = new draw2d.Dimension(pos.x, pos.y, _4895.getWidth(), _4895.getHeight());
         var _4899 = draw2d.SnapToHelper.NSEW;
         var _489a = this.snapToGeometryHelper.snapRectangle(_489b, _4898);
         if((_4899 & draw2d.SnapToHelper.WEST) &&!(_489a & draw2d.SnapToHelper.WEST)) {
            this.showSnapToHelperLineVertical(_4898.x);
            }
         else {
            if((_4899 & draw2d.SnapToHelper.EAST) &&!(_489a & draw2d.SnapToHelper.EAST)) {
               this.showSnapToHelperLineVertical(_4898.getX() + _4898.getWidth());
               }
            else {
               this.hideSnapToHelperLineVertical();
               }
            }
         if((_4899 & draw2d.SnapToHelper.NORTH) &&!(_489a & draw2d.SnapToHelper.NORTH)) {
            this.showSnapToHelperLineHorizontal(_4898.y);
            }
         else {
            if((_4899 & draw2d.SnapToHelper.SOUTH) &&!(_489a & draw2d.SnapToHelper.SOUTH)) {
               this.showSnapToHelperLineHorizontal(_4898.getY() + _4898.getHeight());
               }
            else {
               this.hideSnapToHelperLineHorizontal();
               }
            }
         return _4898.getTopLeft();
         }
      }
   else {
      if(this.snapToGridHelper != null) {
         var _4897 = _4895.getSnapToGridAnchor();
         pos.x = pos.x + _4897.x;
         pos.y = pos.y + _4897.y;
         var _4898 = new draw2d.Point(pos.x, pos.y);
         this.snapToGridHelper.snapPoint(0, pos, _4898);
         _4898.x = _4898.x - _4897.x;
         _4898.y = _4898.y - _4897.y;
         return _4898;
         }
      }
   return pos;
   };
draw2d.Workflow.prototype.showSnapToHelperLineHorizontal = function(_489c) {
   if(this.horizontalSnapToHelperLine == null) {
      this.horizontalSnapToHelperLine = new draw2d.Line();
      this.horizontalSnapToHelperLine.setColor(new draw2d.Color(175, 175, 255));
      this.addFigure(this.horizontalSnapToHelperLine);
      }
   this.horizontalSnapToHelperLine.setStartPoint(0, _489c);
   this.horizontalSnapToHelperLine.setEndPoint(this.getWidth(), _489c);
   };
draw2d.Workflow.prototype.showSnapToHelperLineVertical = function(_489d) {
   if(this.verticalSnapToHelperLine == null) {
      this.verticalSnapToHelperLine = new draw2d.Line();
      this.verticalSnapToHelperLine.setColor(new draw2d.Color(175, 175, 255));
      this.addFigure(this.verticalSnapToHelperLine);
      }
   this.verticalSnapToHelperLine.setStartPoint(_489d, 0);
   this.verticalSnapToHelperLine.setEndPoint(_489d, this.getHeight());
   };
draw2d.Workflow.prototype.hideSnapToHelperLines = function() {
   this.hideSnapToHelperLineHorizontal();
   this.hideSnapToHelperLineVertical();
   };
draw2d.Workflow.prototype.hideSnapToHelperLineHorizontal = function() {
   if(this.horizontalSnapToHelperLine != null) {
      this.removeFigure(this.horizontalSnapToHelperLine);
      this.horizontalSnapToHelperLine = null;
      }
   };
draw2d.Workflow.prototype.hideSnapToHelperLineVertical = function() {
   if(this.verticalSnapToHelperLine != null) {
      this.removeFigure(this.verticalSnapToHelperLine);
      this.verticalSnapToHelperLine = null;
      }
   };
draw2d.Window = function(title) {
   this.title = title;
   this.titlebar = null;
   draw2d.Figure.call(this);
   this.setDeleteable(false);
   this.setCanSnapToHelper(false);
   this.setZOrder(draw2d.Window.ZOrderIndex);
   };
draw2d.Window.prototype = new draw2d.Figure;
draw2d.Window.prototype.type = "Window";
draw2d.Window.ZOrderIndex = 50000;
draw2d.Window.setZOrderBaseIndex = function(index) {
   draw2d.Window.ZOrderBaseIndex = index;
   };
draw2d.Window.prototype.hasFixedPosition = function() {
   return true;
   };
draw2d.Window.prototype.hasTitleBar = function() {
   return true;
   };
draw2d.Window.prototype.createHTMLElement = function() {
   var item = draw2d.Figure.prototype.createHTMLElement.call(this);
   item.style.margin = "0px";
   item.style.padding = "0px";
   item.style.border = "1px solid black";
   item.style.backgroundImage = "url(window_bg.png)";
   item.style.zIndex = draw2d.Window.ZOrderBaseIndex;
   item.style.cursor = null;
   if(this.hasTitleBar()) {
      this.titlebar = document.createElementNS("http://www.w3.org/1999/xhtml","div");
      this.titlebar.style.position = "absolute";
      this.titlebar.style.left = "0px";
      this.titlebar.style.top = "0px";
      this.titlebar.style.width = this.getWidth() + "px";
      this.titlebar.style.height = "15px";
      this.titlebar.style.margin = "0px";
      this.titlebar.style.padding = "0px";
      this.titlebar.style.font = "normal 10px verdana";
      this.titlebar.style.backgroundColor = "blue";
      this.titlebar.style.borderBottom = "2px solid gray";
      this.titlebar.style.whiteSpace = "nowrap";
      this.titlebar.style.textAlign = "center";
      this.titlebar.style.backgroundImage = "url(window_toolbar.png)";
      this.textNode = document.createTextNode(this.title);
      this.titlebar.appendChild(this.textNode);
      item.appendChild(this.titlebar);
      }
   return item;
   };
draw2d.Window.prototype.setDocumentDirty = function(_47e3) {
   };
draw2d.Window.prototype.onDragend = function() {
   };
draw2d.Window.prototype.onDragstart = function(x, y) {
   if(this.titlebar == null) {
      return false;
      }
   if(this.canDrag == true && x < parseInt(this.titlebar.style.width) && y < parseInt(this.titlebar.style.height)) {
      return true;
      }
   return false;
   };
draw2d.Window.prototype.isSelectable = function() {
   return false;
   };
draw2d.Window.prototype.setCanDrag = function(flag) {
   draw2d.Figure.prototype.setCanDrag.call(this, flag);
   this.html.style.cursor = "";
   if(this.titlebar == null) {
      return;
      }
   if(flag) {
      this.titlebar.style.cursor = "move";
      }
   else {
      this.titlebar.style.cursor = "";
      }
   };
draw2d.Window.prototype.setWorkflow = function(_47e7) {
   var _47e8 = this.workflow;
   draw2d.Figure.prototype.setWorkflow.call(this, _47e7);
   if(_47e8 != null) {
      _47e8.removeSelectionListener(this);
      }
   if(this.workflow != null) {
      this.workflow.addSelectionListener(this);
      }
   };
draw2d.Window.prototype.setDimension = function(w, h) {
   draw2d.Figure.prototype.setDimension.call(this, w, h);
   if(this.titlebar != null) {
      this.titlebar.style.width = this.getWidth() + "px";
      }
   };
draw2d.Window.prototype.setTitle = function(title) {
   this.title = title;
   };
draw2d.Window.prototype.getMinWidth = function() {
   return 50;
   };
draw2d.Window.prototype.getMinHeight = function() {
   return 50;
   };
draw2d.Window.prototype.isResizeable = function() {
   return false;
   };
draw2d.Window.prototype.setAlpha = function(_47ec) {
   };
draw2d.Window.prototype.setBackgroundColor = function(color) {
   this.bgColor = color;
   if(this.bgColor != null) {
      this.html.style.backgroundColor = this.bgColor.getHTMLStyle();
      }
   else {
      this.html.style.backgroundColor = "transparent";
      this.html.style.backgroundImage = "";
      }
   };
draw2d.Window.prototype.setColor = function(color) {
   this.lineColor = color;
   if(this.lineColor != null) {
      this.html.style.border = this.lineStroke + "px solid " + this.lineColor.getHTMLStyle();
      }
   else {
      this.html.style.border = "0px";
      }
   };
draw2d.Window.prototype.setLineWidth = function(w) {
   this.lineStroke = w;
   this.html.style.border = this.lineStroke + "px solid black";
   };
draw2d.Window.prototype.onSelectionChanged = function(_47f0) {
   };
draw2d.Button = function(_58d0, width, _58d2) {
   this.x = 0;
   this.y = 0;
   this.id = this.generateUId();
   this.enabled = true;
   this.active = false;
   this.palette = _58d0;
   if(width && _58d2) {
      this.setDimension(width, _58d2);
      }
   else {
      this.setDimension(24, 24);
      }
   this.html = this.createHTMLElement();
   };
draw2d.Button.prototype.type = "Button";
draw2d.Button.prototype.dispose = function() {
   };
draw2d.Button.prototype.getImageUrl = function() {
   if(this.enabled) {
      return this.type + ".png";
      }
   else {
      return this.type + "_disabled.png";
      }
   };
draw2d.Button.prototype.createHTMLElement = function() {
   var item = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   item.id = this.id;
   item.style.position = "absolute";
   item.style.left = this.x + "px";
   item.style.top = this.y + "px";
   item.style.height = this.width + "px";
   item.style.width = this.height + "px";
   item.style.margin = "0px";
   item.style.padding = "0px";
   item.style.outline = "none";
   if(this.getImageUrl() != null) {
      item.style.backgroundImage = "url(" + this.getImageUrl() + ")";
      }
   else {
      item.style.backgroundImage = "";
      }
   var oThis = this;
   this.omousedown = function(event) {
      if(oThis.enabled) {
         oThis.setActive(true);
         }
      event.cancelBubble = true;
      event.returnValue = false;
      };
   this.omouseup = function(event) {
      if(oThis.enabled) {
         oThis.setActive(false);
         oThis.execute();
         }
      event.cancelBubble = true;
      event.returnValue = false;
      };
   if(item.addEventListener) {
      item.addEventListener("mousedown", this.omousedown, false);
      item.addEventListener("mouseup", this.omouseup, false);
      }
   else {
      if(item.attachEvent) {
         item.attachEvent("onmousedown", this.omousedown);
         item.attachEvent("onmouseup", this.omouseup);
         }
      }
   return item;
   };
draw2d.Button.prototype.getHTMLElement = function() {
   if(this.html == null) {
      this.html = this.createHTMLElement();
      }
   return this.html;
   };
draw2d.Button.prototype.execute = function() {
   };
draw2d.Button.prototype.setTooltip = function(_58d7) {
   this.tooltip = _58d7;
   if(this.tooltip != null) {
      this.html.title = this.tooltip;
      }
   else {
      this.html.title = "";
      }
   };
draw2d.Button.prototype.setActive = function(flag) {
   if(!this.enabled) {
      return;
      }
   this.active = flag;
   if(flag == true) {
      this.html.style.border = "2px inset";
      }
   else {
      this.html.style.border = "0px";
      }
   };
draw2d.Button.prototype.isActive = function() {
   return this.active;
   };
draw2d.Button.prototype.setEnabled = function(flag) {
   this.enabled = flag;
   if(this.getImageUrl() != null) {
      this.html.style.backgroundImage = "url(" + this.getImageUrl() + ")";
      }
   else {
      this.html.style.backgroundImage = "";
      }
   };
draw2d.Button.prototype.setDimension = function(w, h) {
   this.width = w;
   this.height = h;
   if(this.html == null) {
      return;
      }
   this.html.style.width = this.width + "px";
   this.html.style.height = this.height + "px";
   };
draw2d.Button.prototype.setPosition = function(xPos, yPos) {
   this.x = Math.max(0, xPos);
   this.y = Math.max(0, yPos);
   if(this.html == null) {
      return;
      }
   this.html.style.left = this.x + "px";
   this.html.style.top = this.y + "px";
   };
draw2d.Button.prototype.getWidth = function() {
   return this.width;
   };
draw2d.Button.prototype.getHeight = function() {
   return this.height;
   };
draw2d.Button.prototype.getY = function() {
   return this.y;
   };
draw2d.Button.prototype.getX = function() {
   return this.x;
   };
draw2d.Button.prototype.getPosition = function() {
   return new draw2d.Point(this.x, this.y);
   };
draw2d.Button.prototype.getToolPalette = function() {
   return this.palette;
   };
draw2d.Button.prototype.generateUId = function() {
   var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
   var _58df = 10;
   var _58e0 = 10;
   nbTry = 0;
   while(nbTry < 1000) {
      var id = "";
      for(var i = 0; i < _58df; i++) {
         var rnum = Math.floor(Math.random() * chars.length);
         id += chars.substring(rnum, rnum + 1);
         }
      elem = document.getElementById(id);
      if(!elem) {
         return id;
         }
      nbTry += 1;
      }
   return null;
   };
draw2d.ToggleButton = function(_5510) {
   draw2d.Button.call(this, _5510);
   this.isDownFlag = false;
   };
draw2d.ToggleButton.prototype = new draw2d.Button;
draw2d.ToggleButton.prototype.type = "ToggleButton";
draw2d.ToggleButton.prototype.createHTMLElement = function() {
   var item = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   item.id = this.id;
   item.style.position = "absolute";
   item.style.left = this.x + "px";
   item.style.top = this.y + "px";
   item.style.height = "24px";
   item.style.width = "24px";
   item.style.margin = "0px";
   item.style.padding = "0px";
   if(this.getImageUrl() != null) {
      item.style.backgroundImage = "url(" + this.getImageUrl() + ")";
      }
   else {
      item.style.backgroundImage = "";
      }
   var oThis = this;
   this.omousedown = function(event) {
      if(oThis.enabled) {
         if(!oThis.isDown()) {
            draw2d.Button.prototype.setActive.call(oThis, true);
            }
         }
      event.cancelBubble = true;
      event.returnValue = false;
      };
   this.omouseup = function(event) {
      if(oThis.enabled) {
         if(oThis.isDown()) {
            draw2d.Button.prototype.setActive.call(oThis, false);
            }
         oThis.isDownFlag =!oThis.isDownFlag;
         oThis.execute();
         }
      event.cancelBubble = true;
      event.returnValue = false;
      };
   if(item.addEventListener) {
      item.addEventListener("mousedown", this.omousedown, false);
      item.addEventListener("mouseup", this.omouseup, false);
      }
   else {
      if(item.attachEvent) {
         item.attachEvent("onmousedown", this.omousedown);
         item.attachEvent("onmouseup", this.omouseup);
         }
      }
   return item;
   };
draw2d.ToggleButton.prototype.isDown = function() {
   return this.isDownFlag;
   };
draw2d.ToggleButton.prototype.setActive = function(flag) {
   draw2d.Button.prototype.setActive.call(this, flag);
   this.isDownFlag = flag;
   };
draw2d.ToggleButton.prototype.execute = function() {
   };
draw2d.ToolGeneric = function(_45a6) {
   this.x = 0;
   this.y = 0;
   this.enabled = true;
   this.tooltip = null;
   this.palette = _45a6;
   this.setDimension(10, 10);
   this.html = this.createHTMLElement();
   };
draw2d.ToolGeneric.prototype.type = "ToolGeneric";
draw2d.ToolGeneric.prototype.dispose = function() {
   };
draw2d.ToolGeneric.prototype.getImageUrl = function() {
   if(this.enabled) {
      return this.type + ".png";
      }
   else {
      return this.type + "_disabled.png";
      }
   };
draw2d.ToolGeneric.prototype.createHTMLElement = function() {
   var item = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   item.id = this.id;
   item.style.position = "absolute";
   item.style.left = this.x + "px";
   item.style.top = this.y + "px";
   item.style.height = "24px";
   item.style.width = "24px";
   item.style.margin = "0px";
   item.style.padding = "0px";
   if(this.getImageUrl() != null) {
      item.style.backgroundImage = "url(" + this.getImageUrl() + ")";
      }
   else {
      item.style.backgroundImage = "";
      }
   var oThis = this;
   this.click = function(event) {
      if(oThis.enabled) {
         oThis.palette.setActiveTool(oThis);
         }
      event.cancelBubble = true;
      event.returnValue = false;
      };
   if(item.addEventListener) {
      item.addEventListener("click", this.click, false);
      }
   else {
      if(item.attachEvent) {
         item.attachEvent("onclick", this.click);
         }
      }
   return item;
   };
draw2d.ToolGeneric.prototype.getHTMLElement = function() {
   if(this.html == null) {
      this.html = this.createHTMLElement();
      }
   return this.html;
   };
draw2d.ToolGeneric.prototype.execute = function(x, y) {
   if(this.enabled) {
      this.palette.setActiveTool(null);
      }
   };
draw2d.ToolGeneric.prototype.setTooltip = function(_45ac) {
   this.tooltip = _45ac;
   if(this.tooltip != null) {
      this.html.title = this.tooltip;
      }
   else {
      this.html.title = "";
      }
   };
draw2d.ToolGeneric.prototype.setActive = function(flag) {
   if(!this.enabled) {
      return;
      }
   if(flag == true) {
      this.html.style.border = "2px inset";
      }
   else {
      this.html.style.border = "0px";
      }
   };
draw2d.ToolGeneric.prototype.setEnabled = function(flag) {
   this.enabled = flag;
   if(this.getImageUrl() != null) {
      this.html.style.backgroundImage = "url(" + this.getImageUrl() + ")";
      }
   else {
      this.html.style.backgroundImage = "";
      }
   };
draw2d.ToolGeneric.prototype.setDimension = function(w, h) {
   this.width = w;
   this.height = h;
   if(this.html == null) {
      return;
      }
   this.html.style.width = this.width + "px";
   this.html.style.height = this.height + "px";
   };
draw2d.ToolGeneric.prototype.setPosition = function(xPos, yPos) {
   this.x = Math.max(0, xPos);
   this.y = Math.max(0, yPos);
   if(this.html == null) {
      return;
      }
   this.html.style.left = this.x + "px";
   this.html.style.top = this.y + "px";
   };
draw2d.ToolGeneric.prototype.getWidth = function() {
   return this.width;
   };
draw2d.ToolGeneric.prototype.getHeight = function() {
   return this.height;
   };
draw2d.ToolGeneric.prototype.getY = function() {
   return this.y;
   };
draw2d.ToolGeneric.prototype.getX = function() {
   return this.x;
   };
draw2d.ToolGeneric.prototype.getPosition = function() {
   return new draw2d.Point(this.x, this.y);
   };
draw2d.ToolPalette = function(title) {
   draw2d.Window.call(this, title);
   this.setDimension(75, 400);
   this.activeTool = null;
   this.children = new Object();
   };
draw2d.ToolPalette.prototype = new draw2d.Window;
draw2d.ToolPalette.prototype.type = "ToolPalette";
draw2d.ToolPalette.prototype.dispose = function() {
   draw2d.Window.prototype.dispose.call(this);
   };
draw2d.ToolPalette.prototype.createHTMLElement = function() {
   var item = draw2d.Window.prototype.createHTMLElement.call(this);
   this.scrollarea = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   this.scrollarea.style.position = "absolute";
   this.scrollarea.style.left = "0px";
   if(this.hasTitleBar()) {
      this.scrollarea.style.top = "15px";
      }
   else {
      this.scrollarea.style.top = "0px";
      }
   this.scrollarea.style.width = this.getWidth() + "px";
   this.scrollarea.style.height = "15px";
   this.scrollarea.style.margin = "0px";
   this.scrollarea.style.padding = "0px";
   this.scrollarea.style.font = "normal 10px verdana";
   this.scrollarea.style.borderBottom = "2px solid gray";
   this.scrollarea.style.whiteSpace = "nowrap";
   this.scrollarea.style.textAlign = "center";
   this.scrollarea.style.overflowX = "auto";
   this.scrollarea.style.overflowY = "auto";
   this.scrollarea.style.overflow = "auto";
   item.appendChild(this.scrollarea);
   return item;
   };
draw2d.ToolPalette.prototype.setDimension = function(w, h) {
   draw2d.Window.prototype.setDimension.call(this, w, h);
   if(this.scrollarea != null) {
      this.scrollarea.style.width = this.getWidth() + "px";
      if(this.hasTitleBar()) {
         this.scrollarea.style.height = (this.getHeight() - 15) + "px";
         }
      else {
         this.scrollarea.style.height = this.getHeight() + "px";
         }
      }
   };
draw2d.ToolPalette.prototype.addChild = function(item) {
   this.children[item.id] = item;
   this.scrollarea.appendChild(item.getHTMLElement());
   };
draw2d.ToolPalette.prototype.getChild = function(id) {
   return this.children[id];
   };
draw2d.ToolPalette.prototype.getActiveTool = function() {
   return this.activeTool;
   };
draw2d.ToolPalette.prototype.setActiveTool = function(tool) {
   if(this.activeTool != tool && this.activeTool != null) {
      this.activeTool.setActive(false);
      }
   if(tool != null) {
      tool.setActive(true);
      }
   this.activeTool = tool;
   };
draw2d.Dialog = function(title) {
   this.buttonbar = null;
   if(title) {
      draw2d.Window.call(this, title);
      }
   else {
      draw2d.Window.call(this, "Dialog");
      }
   this.setDimension(400, 300);
   };
draw2d.Dialog.prototype = new draw2d.Window;
draw2d.Dialog.prototype.type = "Dialog";
draw2d.Dialog.prototype.createHTMLElement = function() {
   var item = draw2d.Window.prototype.createHTMLElement.call(this);
   var oThis = this;
   this.buttonbar = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   this.buttonbar.style.position = "absolute";
   this.buttonbar.style.left = "0px";
   this.buttonbar.style.bottom = "0px";
   this.buttonbar.style.width = this.getWidth() + "px";
   this.buttonbar.style.height = "30px";
   this.buttonbar.style.margin = "0px";
   this.buttonbar.style.padding = "0px";
   this.buttonbar.style.font = "normal 10px verdana";
   this.buttonbar.style.backgroundColor = "#c0c0c0";
   this.buttonbar.style.borderBottom = "2px solid gray";
   this.buttonbar.style.whiteSpace = "nowrap";
   this.buttonbar.style.textAlign = "center";
   this.okbutton = document.createElementNS("http://www.w3.org/1999/xhtml","button");
   this.okbutton.style.border = "1px solid gray";
   this.okbutton.style.font = "normal 10px verdana";
   this.okbutton.style.width = "80px";
   this.okbutton.style.margin = "5px";
   this.okbutton.innerHTML = "Ok";
   this.okbutton.onclick = function() {
      oThis.onOk();
      };
   this.buttonbar.appendChild(this.okbutton);
   this.cancelbutton = document.createElementNS("http://www.w3.org/1999/xhtml","button");
   this.cancelbutton.innerHTML = "Cancel";
   this.cancelbutton.style.font = "normal 10px verdana";
   this.cancelbutton.style.border = "1px solid gray";
   this.cancelbutton.style.width = "80px";
   this.cancelbutton.style.margin = "5px";
   this.cancelbutton.onclick = function() {
      oThis.onCancel();
      };
   this.buttonbar.appendChild(this.cancelbutton);
   item.appendChild(this.buttonbar);
   return item;
   };
draw2d.Dialog.prototype.onOk = function() {
   this.workflow.removeFigure(this);
   };
draw2d.Dialog.prototype.onCancel = function() {
   this.workflow.removeFigure(this);
   };
draw2d.Dialog.prototype.setDimension = function(w, h) {
   draw2d.Window.prototype.setDimension.call(this, w, h);
   if(this.buttonbar != null) {
      this.buttonbar.style.width = this.getWidth() + "px";
      }
   };
draw2d.Dialog.prototype.setWorkflow = function(_4b26) {
   draw2d.Window.prototype.setWorkflow.call(this, _4b26);
   this.setFocus();
   };
draw2d.Dialog.prototype.setFocus = function() {
   };
draw2d.Dialog.prototype.onSetDocumentDirty = function() {
   };
draw2d.InputDialog = function() {
   draw2d.Dialog.call(this);
   this.setDimension(400, 100);
   };
draw2d.InputDialog.prototype = new draw2d.Dialog;
draw2d.InputDialog.prototype.type = "InputDialog";
draw2d.InputDialog.prototype.createHTMLElement = function() {
   var item = draw2d.Dialog.prototype.createHTMLElement.call(this);
   return item;
   };
draw2d.InputDialog.prototype.onOk = function() {
   this.workflow.removeFigure(this);
   };
draw2d.InputDialog.prototype.onCancel = function() {
   this.workflow.removeFigure(this);
   };
draw2d.PropertyDialog = function(_541b, _541c, label) {
   this.figure = _541b;
   this.propertyName = _541c;
   this.label = label;
   draw2d.Dialog.call(this);
   this.setDimension(400, 120);
   };
draw2d.PropertyDialog.prototype = new draw2d.Dialog;
draw2d.PropertyDialog.prototype.type = "PropertyDialog";
draw2d.PropertyDialog.prototype.createHTMLElement = function() {
   var item = draw2d.Dialog.prototype.createHTMLElement.call(this);
   var _541f = document.createElementNS("http://www.w3.org/1999/xhtml","form");
   _541f.style.position = "absolute";
   _541f.style.left = "10px";
   _541f.style.top = "30px";
   _541f.style.width = "375px";
   _541f.style.font = "normal 10px verdana";
   item.appendChild(_541f);
   this.labelDiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   this.labelDiv.innerHTML = this.label;
   this.disableTextSelection(this.labelDiv);
   _541f.appendChild(this.labelDiv);
   this.input = document.createElementNS("http://www.w3.org/1999/xhtml","input");
   this.input.style.border = "1px solid gray";
   this.input.style.font = "normal 10px verdana";
   this.input.type = "text";
   var value = this.figure.getProperty(this.propertyName);
   if(value) {
      this.input.value = value;
      }
   else {
      this.input.value = "";
      }
   this.input.style.width = "100%";
   _541f.appendChild(this.input);
   this.input.focus();
   return item;
   };
draw2d.PropertyDialog.prototype.onOk = function() {
   draw2d.Dialog.prototype.onOk.call(this);
   this.figure.setProperty(this.propertyName, this.input.value);
   };
draw2d.AnnotationDialog = function(_4575) {
   this.figure = _4575;
   draw2d.Dialog.call(this);
   this.setDimension(400, 100);
   };
draw2d.AnnotationDialog.prototype = new draw2d.Dialog;
draw2d.AnnotationDialog.prototype.type = "AnnotationDialog";
draw2d.AnnotationDialog.prototype.createHTMLElement = function() {
   var item = draw2d.Dialog.prototype.createHTMLElement.call(this);
   var _4577 = document.createElementNS("http://www.w3.org/1999/xhtml","form");
   _4577.style.position = "absolute";
   _4577.style.left = "10px";
   _4577.style.top = "30px";
   _4577.style.width = "375px";
   _4577.style.font = "normal 10px verdana";
   item.appendChild(_4577);
   this.label = document.createTextNode("Text");
   _4577.appendChild(this.label);
   this.input = document.createElementNS("http://www.w3.org/1999/xhtml","input");
   this.input.style.border = "1px solid gray";
   this.input.style.font = "normal 10px verdana";
   this.input.type = "text";
   var value = this.figure.getText();
   if(value) {
      this.input.value = value;
      }
   else {
      this.input.value = "";
      }
   this.input.style.width = "100%";
   _4577.appendChild(this.input);
   this.input.focus();
   return item;
   };
draw2d.AnnotationDialog.prototype.onOk = function() {
   this.workflow.getCommandStack().execute(new draw2d.CommandSetText(this.figure, this.input.value));
   this.workflow.removeFigure(this);
   };
draw2d.PropertyWindow = function() {
   this.currentSelection = null;
   draw2d.Window.call(this, "Property Window");
   this.setDimension(200, 100);
   };
draw2d.PropertyWindow.prototype = new draw2d.Window;
draw2d.PropertyWindow.prototype.type = "PropertyWindow";
draw2d.PropertyWindow.prototype.dispose = function() {
   draw2d.Window.prototype.dispose.call(this);
   };
draw2d.PropertyWindow.prototype.createHTMLElement = function() {
   var item = draw2d.Window.prototype.createHTMLElement.call(this);
   item.appendChild(this.createLabel("Type:", 15, 25));
   item.appendChild(this.createLabel("X :", 15, 50));
   item.appendChild(this.createLabel("Y :", 15, 70));
   item.appendChild(this.createLabel("Width :", 85, 50));
   item.appendChild(this.createLabel("Height :", 85, 70));
   this.labelType = this.createLabel("", 50, 25);
   this.labelX = this.createLabel("", 40, 50);
   this.labelY = this.createLabel("", 40, 70);
   this.labelWidth = this.createLabel("", 135, 50);
   this.labelHeight = this.createLabel("", 135, 70);
   this.labelType.style.fontWeight = "normal";
   this.labelX.style.fontWeight = "normal";
   this.labelY.style.fontWeight = "normal";
   this.labelWidth.style.fontWeight = "normal";
   this.labelHeight.style.fontWeight = "normal";
   item.appendChild(this.labelType);
   item.appendChild(this.labelX);
   item.appendChild(this.labelY);
   item.appendChild(this.labelWidth);
   item.appendChild(this.labelHeight);
   return item;
   };
draw2d.PropertyWindow.prototype.onSelectionChanged = function(_5324) {
   draw2d.Window.prototype.onSelectionChanged.call(this, _5324);
   if(this.currentSelection != null) {
      this.currentSelection.detachMoveListener(this);
      }
   this.currentSelection = _5324;
   if(_5324 != null && _5324 != this) {
      this.labelType.innerHTML = _5324.type;
      if(_5324.getX) {
         this.labelX.innerHTML = _5324.getX();
         this.labelY.innerHTML = _5324.getY();
         this.labelWidth.innerHTML = _5324.getWidth();
         this.labelHeight.innerHTML = _5324.getHeight();
         this.currentSelection = _5324;
         this.currentSelection.attachMoveListener(this);
         }
      else {
         this.labelX.innerHTML = "";
         this.labelY.innerHTML = "";
         this.labelWidth.innerHTML = "";
         this.labelHeight.innerHTML = "";
         }
      }
   else {
      this.labelType.innerHTML = "&lt;none&gt;";
      this.labelX.innerHTML = "";
      this.labelY.innerHTML = "";
      this.labelWidth.innerHTML = "";
      this.labelHeight.innerHTML = "";
      }
   };
draw2d.PropertyWindow.prototype.getCurrentSelection = function() {
   return this.currentSelection;
   };
draw2d.PropertyWindow.prototype.onOtherFigureMoved = function(_5325) {
   if(_5325 == this.currentSelection) {
      this.onSelectionChanged(_5325);
      }
   };
draw2d.PropertyWindow.prototype.createLabel = function(text, x, y) {
   var l = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   l.style.position = "absolute";
   l.style.left = x + "px";
   l.style.top = y + "px";
   l.style.font = "normal 10px verdana";
   l.style.whiteSpace = "nowrap";
   l.style.fontWeight = "bold";
   l.innerHTML = text;
   return l;
   };
draw2d.ColorDialog = function() {
   this.maxValue = {
      "h" : "359", "s" : "100", "v" : "100"};
   this.HSV = {
      0 : 359, 1 : 100, 2 : 100};
   this.slideHSV = {
      0 : 359, 1 : 100, 2 : 100};
   this.SVHeight = 165;
   this.wSV = 162;
   this.wH = 162;
   draw2d.Dialog.call(this, "Color Chooser");
   this.loadSV();
   this.setColor(new draw2d.Color(255, 0, 0));
   this.setDimension(219, 244);
   };
draw2d.ColorDialog.prototype = new draw2d.Dialog;
draw2d.ColorDialog.prototype.type = "ColorDialog";
draw2d.ColorDialog.prototype.createHTMLElement = function() {
   var oThis = this;
   var item = draw2d.Dialog.prototype.createHTMLElement.call(this);
   this.outerDiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   this.outerDiv.id = "plugin";
   this.outerDiv.style.top = "15px";
   this.outerDiv.style.left = "0px";
   this.outerDiv.style.width = "201px";
   this.outerDiv.style.position = "absolute";
   this.outerDiv.style.padding = "9px";
   this.outerDiv.display = "block";
   this.outerDiv.style.background = "#0d0d0d";
   this.plugHEX = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   this.plugHEX.id = "plugHEX";
   this.plugHEX.innerHTML = "F1FFCC";
   this.plugHEX.style.color = "white";
   this.plugHEX.style.font = "normal 10px verdana";
   this.outerDiv.appendChild(this.plugHEX);
   this.SV = document.createElement("div");
   this.SV.onmousedown = function(event) {
      oThis.mouseDownSV(oThis.SVslide, event);
      };
   this.SV.id = "SV";
   this.SV.style.cursor = "crosshair";
   this.SV.style.background = "#FF0000 url(SatVal.png)";
   this.SV.style.position = "absolute";
   this.SV.style.height = "166px";
   this.SV.style.width = "167px";
   this.SV.style.marginRight = "10px";
   this.SV.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='SatVal.png', sizingMethod='scale')";
   this.SV.style["float"] = "left";
   this.outerDiv.appendChild(this.SV);
   this.SVslide = document.createElement("div");
   this.SVslide.onmousedown = function(event) {
      oThis.mouseDownSV(event);
      };
   this.SVslide.style.top = "40px";
   this.SVslide.style.left = "40px";
   this.SVslide.style.position = "absolute";
   this.SVslide.style.cursor = "crosshair";
   this.SVslide.style.background = "url(slide.gif)";
   this.SVslide.style.height = "9px";
   this.SVslide.style.width = "9px";
   this.SVslide.style.lineHeight = "1px";
   this.outerDiv.appendChild(this.SVslide);
   this.H = document.createElement("form");
   this.H.id = "H";
   this.H.onmousedown = function(event) {
      oThis.mouseDownH(event);
      };
   this.H.style.border = "1px solid #000000";
   this.H.style.cursor = "crosshair";
   this.H.style.position = "absolute";
   this.H.style.width = "19px";
   this.H.style.top = "28px";
   this.H.style.left = "191px";
   this.outerDiv.appendChild(this.H);
   this.Hslide = document.createElement("div");
   this.Hslide.style.top = "-7px";
   this.Hslide.style.left = "-8px";
   this.Hslide.style.background = "url(slideHue.gif)";
   this.Hslide.style.height = "5px";
   this.Hslide.style.width = "33px";
   this.Hslide.style.position = "absolute";
   this.Hslide.style.lineHeight = "1px";
   this.H.appendChild(this.Hslide);
   this.Hmodel = document.createElement("div");
   this.Hmodel.style.height = "1px";
   this.Hmodel.style.width = "19px";
   this.Hmodel.style.lineHeight = "1px";
   this.Hmodel.style.margin = "0px";
   this.Hmodel.style.padding = "0px";
   this.Hmodel.style.fontSize = "1px";
   this.H.appendChild(this.Hmodel);
   item.appendChild(this.outerDiv);
   return item;
   };
draw2d.ColorDialog.prototype.onOk = function() {
   draw2d.Dialog.prototype.onOk.call(this);
   };
draw2d.browser = function(v) {
   return (Math.max(navigator.userAgent.toLowerCase().indexOf(v), 0));
   };
draw2d.ColorDialog.prototype.showColor = function(c) {
   this.plugHEX.style.background = "#" + c;
   this.plugHEX.innerHTML = c;
   };
draw2d.ColorDialog.prototype.getSelectedColor = function() {
   var rgb = this.hex2rgb(this.plugHEX.innerHTML);
   return new draw2d.Color(rgb[0], rgb[1], rgb[2]);
   };
draw2d.ColorDialog.prototype.setColor = function(color) {
   if(color == null) {
      color = new draw2d.Color(100, 100, 100);
      }
   var hex = this.rgb2hex(Array(color.getRed(), color.getGreen(), color.getBlue()));
   this.updateH(hex);
   };
draw2d.ColorDialog.prototype.XY = function(e, v) {
   var z = draw2d.browser("msie") ? Array(event.clientX + document.body.scrollLeft, event.clientY + document.body.scrollTop) : Array(e.pageX, e.pageY);
   return z[v];
   };
draw2d.ColorDialog.prototype.mkHSV = function(a, b, c) {
   return (Math.min(a, Math.max(0, Math.ceil((parseInt(c) / b) * a))));
   };
draw2d.ColorDialog.prototype.ckHSV = function(a, b) {
   if(a >= 0 && a <= b) {
      return (a);
      }
   else {
      if(a > b) {
         return (b);
         }
      else {
         if(a < 0) {
            return ("-" + oo);
            }
         }
      }
   };
draw2d.ColorDialog.prototype.mouseDownH = function(e) {
   this.slideHSV[0] = this.HSV[0];
   var oThis = this;
   this.H.onmousemove = function(e) {
      oThis.dragH(e);
      };
   this.H.onmouseup = function(e) {
      oThis.H.onmousemove = "";
      oThis.H.onmouseup = "";
      };
   this.dragH(e);
   };
draw2d.ColorDialog.prototype.dragH = function(e) {
   var y = this.XY(e, 1) - this.getY() - 40;
   this.Hslide.style.top = (this.ckHSV(y, this.wH) - 5) + "px";
   this.slideHSV[0] = this.mkHSV(359, this.wH, this.Hslide.style.top);
   this.updateSV();
   this.showColor(this.commit());
   this.SV.style.backgroundColor = "#" + this.hsv2hex(Array(this.HSV[0], 100, 100));
   };
draw2d.ColorDialog.prototype.mouseDownSV = function(o, e) {
   this.slideHSV[0] = this.HSV[0];
   var oThis = this;
   function reset() {
      oThis.SV.onmousemove = "";
      oThis.SV.onmouseup = "";
      oThis.SVslide.onmousemove = "";
      oThis.SVslide.onmouseup = "";
      }
   this.SV.onmousemove = function(e) {
      oThis.dragSV(e);
      };
   this.SV.onmouseup = reset;
   this.SVslide.onmousemove = function(e) {
      oThis.dragSV(e);
      };
   this.SVslide.onmouseup = reset;
   this.dragSV(e);
   };
draw2d.ColorDialog.prototype.dragSV = function(e) {
   var x = this.XY(e, 0) - this.getX() - 1;
   var y = this.XY(e, 1) - this.getY() - 20;
   this.SVslide.style.left = this.ckHSV(x, this.wSV) + "px";
   this.SVslide.style.top = this.ckHSV(y, this.wSV) + "px";
   this.slideHSV[1] = this.mkHSV(100, this.wSV, this.SVslide.style.left);
   this.slideHSV[2] = 100 - this.mkHSV(100, this.wSV, this.SVslide.style.top);
   this.updateSV();
   };
draw2d.ColorDialog.prototype.commit = function() {
   var r = "hsv";
   var z = {
      };
   var j = "";
   for(var i = 0; i <= r.length - 1; i++) {
      j = r.substr(i, 1);
      z[i] = (j == "h") ? this.maxValue[j] - this.mkHSV(this.maxValue[j], this.wH, this.Hslide.style.top) : this.HSV[i];
      }
   return (this.updateSV(this.hsv2hex(z)));
   };
draw2d.ColorDialog.prototype.updateSV = function(v) {
   this.HSV = v ? this.hex2hsv(v) : Array(this.slideHSV[0], this.slideHSV[1], this.slideHSV[2]);
   if(!v) {
      v = this.hsv2hex(Array(this.slideHSV[0], this.slideHSV[1], this.slideHSV[2]));
      }
   this.showColor(v);
   return v;
   };
draw2d.ColorDialog.prototype.loadSV = function() {
   var z = "";
   for(var i = this.SVHeight; i >= 0; i--) {
      z += "<div style=\"background:#" + this.hsv2hex(Array(Math.round((359 / this.SVHeight) * i), 100, 100)) + ";\"><br/></div>";
      }
   this.Hmodel.innerHTML = z;
   };
draw2d.ColorDialog.prototype.updateH = function(v) {
   this.plugHEX.innerHTML = v;
   this.HSV = this.hex2hsv(v);
   this.SV.style.backgroundColor = "#" + this.hsv2hex(Array(this.HSV[0], 100, 100));
   this.SVslide.style.top = (parseInt(this.wSV - this.wSV * (this.HSV[1]/100))+20)+"px";
   this.SVslide.style.left = (parseInt(this.wSV * (this.HSV[1]/100))+5)+"px";
   this.Hslide.style.top = (parseInt(this.wH * ((this.maxValue["h"] - this.HSV[0]) / this.maxValue["h"])) - 7) + "px";
   };
draw2d.ColorDialog.prototype.toHex = function(v) {
   v = Math.round(Math.min(Math.max(0, v), 255));
   return ("0123456789ABCDEF".charAt((v - v % 16) / 16) + "0123456789ABCDEF".charAt(v % 16));
   };
draw2d.ColorDialog.prototype.hex2rgb = function(r) {
   return ( {
      0 : parseInt(r.substr(0, 2), 16), 1 : parseInt(r.substr(2, 2), 16), 2 : parseInt(r.substr(4, 2), 16)}
   );
   };
draw2d.ColorDialog.prototype.rgb2hex = function(r) {
   return (this.toHex(r[0]) + this.toHex(r[1]) + this.toHex(r[2]));
   };
draw2d.ColorDialog.prototype.hsv2hex = function(h) {
   return (this.rgb2hex(this.hsv2rgb(h)));
   };
draw2d.ColorDialog.prototype.hex2hsv = function(v) {
   return (this.rgb2hsv(this.hex2rgb(v)));
   };
draw2d.ColorDialog.prototype.rgb2hsv = function(r) {
   var max = Math.max(r[0], r[1], r[2]);
   var delta = max - Math.min(r[0], r[1], r[2]);
   var H;
   var S;
   var V;
   if(max != 0) {
      S = Math.round(delta / max * 100);
      if(r[0] == max) {
         H = (r[1] - r[2]) / delta;
         }
      else {
         if(r[1] == max) {
            H = 2 + (r[2] - r[0]) / delta;
            }
         else {
            if(r[2] == max) {
               H = 4 + (r[0] - r[1]) / delta;
               }
            }
         }
      var H = Math.min(Math.round(H * 60), 360);
      if(H < 0) {
         H += 360;
         }
      }
   return ( {
      0 : H ? H : 0, 1 : S ? S : 0, 2 : Math.round((max / 255) * 100)}
   );
   };
draw2d.ColorDialog.prototype.hsv2rgb = function(r) {
   var R;
   var B;
   var G;
   var S = r[1]/100;
   var V = r[2]/100;
   var H = r[0]/360;
   if(S > 0) {
      if(H >= 1) {
         H = 0;
         }
      H = 6 * H;
      F = H - Math.floor(H);
      A = Math.round(255 * V * (1 - S));
      B = Math.round(255 * V * (1 - (S * F)));
      C = Math.round(255 * V * (1 - (S * (1 - F))));
      V = Math.round(255 * V);
      switch(Math.floor(H)) {
         case 0 : R = V;
         G = C;
         B = A;
         break;
         case 1 : R = B;
         G = V;
         B = A;
         break;
         case 2 : R = A;
         G = V;
         B = C;
         break;
         case 3 : R = A;
         G = B;
         B = V;
         break;
         case 4 : R = C;
         G = A;
         B = V;
         break;
         case 5 : R = V;
         G = A;
         B = B;
         break;
         }
      return ( {
         0 : R ? R : 0, 1 : G ? G : 0, 2 : B ? B : 0}
      );
      }
   else {
      return ( {
         0 : (V = Math.round(V * 255)), 1 : V, 2 : V}
      );
      }
   };
draw2d.LineColorDialog = function(_58e8) {
   draw2d.ColorDialog.call(this);
   this.figure = _58e8;
   var color = _58e8.getColor();
   this.updateH(this.rgb2hex(color.getRed(), color.getGreen(), color.getBlue()));
   };
draw2d.LineColorDialog.prototype = new draw2d.ColorDialog;
draw2d.LineColorDialog.prototype.type = "LineColorDialog";
draw2d.LineColorDialog.prototype.onOk = function() {
   var _58ea = this.workflow;
   draw2d.ColorDialog.prototype.onOk.call(this);
   if(typeof this.figure.setColor == "function") {
      _58ea.getCommandStack().execute(new draw2d.CommandSetColor(this.figure, this.getSelectedColor()));
      if(_58ea.getCurrentSelection() == this.figure) {
         _58ea.setCurrentSelection(this.figure);
         }
      }
   };
draw2d.BackgroundColorDialog = function(_48a7) {
   draw2d.ColorDialog.call(this);
   this.figure = _48a7;
   var color = _48a7.getBackgroundColor();
   if(color != null) {
      this.updateH(this.rgb2hex(color.getRed(), color.getGreen(), color.getBlue()));
      }
   };
draw2d.BackgroundColorDialog.prototype = new draw2d.ColorDialog;
draw2d.BackgroundColorDialog.prototype.type = "BackgroundColorDialog";
draw2d.BackgroundColorDialog.prototype.onOk = function() {
   var _48a9 = this.workflow;
   draw2d.ColorDialog.prototype.onOk.call(this);
   if(typeof this.figure.setBackgroundColor == "function") {
      _48a9.getCommandStack().execute(new draw2d.CommandSetBackgroundColor(this.figure, this.getSelectedColor()));
      if(_48a9.getCurrentSelection() == this.figure) {
         _48a9.setCurrentSelection(this.figure);
         }
      }
   };
draw2d.AnnotationDialog = function(_4575) {
   this.figure = _4575;
   draw2d.Dialog.call(this);
   this.setDimension(400, 100);
   };
draw2d.AnnotationDialog.prototype = new draw2d.Dialog;
draw2d.AnnotationDialog.prototype.type = "AnnotationDialog";
draw2d.AnnotationDialog.prototype.createHTMLElement = function() {
   var item = draw2d.Dialog.prototype.createHTMLElement.call(this);
   var _4577 = document.createElement("form");
   _4577.style.position = "absolute";
   _4577.style.left = "10px";
   _4577.style.top = "30px";
   _4577.style.width = "375px";
   _4577.style.font = "normal 10px verdana";
   item.appendChild(_4577);
   this.label = document.createTextNode("Text");
   _4577.appendChild(this.label);
   this.input = document.createElement("input");
   this.input.style.border = "1px solid gray";
   this.input.style.font = "normal 10px verdana";
   this.input.type = "text";
   var value = this.figure.getText();
   if(value) {
      this.input.value = value;
      }
   else {
      this.input.value = "";
      }
   this.input.style.width = "100%";
   _4577.appendChild(this.input);
   this.input.focus();
   return item;
   };
draw2d.AnnotationDialog.prototype.onOk = function() {
   this.workflow.getCommandStack().execute(new draw2d.CommandSetText(this.figure, this.input.value));
   this.workflow.removeFigure(this);
   };
draw2d.Command = function(label) {
   this.label = label;
   };
draw2d.Command.prototype.type = "Command";
draw2d.Command.prototype.getLabel = function() {
   };
draw2d.Command.prototype.canExecute = function() {
   return true;
   };
draw2d.Command.prototype.execute = function() {
   };
draw2d.Command.prototype.undo = function() {
   };
draw2d.Command.prototype.redo = function() {
   };
draw2d.CommandStack = function() {
   this.undostack = new Array();
   this.redostack = new Array();
   this.maxundo = 50;
   this.eventListeners = new draw2d.ArrayList();
   };
draw2d.CommandStack.PRE_EXECUTE = 1;
draw2d.CommandStack.PRE_REDO = 2;
draw2d.CommandStack.PRE_UNDO = 4;
draw2d.CommandStack.POST_EXECUTE = 8;
draw2d.CommandStack.POST_REDO = 16;
draw2d.CommandStack.POST_UNDO = 32;
draw2d.CommandStack.POST_MASK = draw2d.CommandStack.POST_EXECUTE | draw2d.CommandStack.POST_UNDO | draw2d.CommandStack.POST_REDO;
draw2d.CommandStack.PRE_MASK = draw2d.CommandStack.PRE_EXECUTE | draw2d.CommandStack.PRE_UNDO | draw2d.CommandStack.PRE_REDO;
draw2d.CommandStack.prototype.type = "CommandStack";
draw2d.CommandStack.prototype.setUndoLimit = function(count) {
   this.maxundo = count;
   };
draw2d.CommandStack.prototype.markSaveLocation = function() {
   this.undostack = new Array();
   this.redostack = new Array();
   };
draw2d.CommandStack.prototype.execute = function(_47b8) {
   if(_47b8.canExecute() == false) {
      return;
      }
   this.notifyListeners(_47b8, draw2d.CommandStack.PRE_EXECUTE);
   this.undostack.push(_47b8);
   _47b8.execute();
   this.redostack = new Array();
   if(this.undostack.length > this.maxundo) {
      this.undostack = this.undostack.slice(this.undostack.length - this.maxundo);
      }
   this.notifyListeners(_47b8, draw2d.CommandStack.POST_EXECUTE);
   };
draw2d.CommandStack.prototype.undo = function() {
   var _47b9 = this.undostack.pop();
   if(_47b9) {
      this.notifyListeners(_47b9, draw2d.CommandStack.PRE_UNDO);
      this.redostack.push(_47b9);
      _47b9.undo();
      this.notifyListeners(_47b9, draw2d.CommandStack.POST_UNDO);
      }
   };
draw2d.CommandStack.prototype.redo = function() {
   var _47ba = this.redostack.pop();
   if(_47ba) {
      this.notifyListeners(_47ba, draw2d.CommandStack.PRE_REDO);
      this.undostack.push(_47ba);
      _47ba.redo();
      this.notifyListeners(_47ba, draw2d.CommandStack.POST_REDO);
      }
   };
draw2d.CommandStack.prototype.canRedo = function() {
   return this.redostack.length > 0;
   };
draw2d.CommandStack.prototype.canUndo = function() {
   return this.undostack.length > 0;
   };
draw2d.CommandStack.prototype.addCommandStackEventListener = function(_47bb) {
   this.eventListeners.add(_47bb);
   };
draw2d.CommandStack.prototype.removeCommandStackEventListener = function(_47bc) {
   this.eventListeners.remove(_47bc);
   };
draw2d.CommandStack.prototype.notifyListeners = function(_47bd, state) {
   var event = new draw2d.CommandStackEvent(_47bd, state);
   var size = this.eventListeners.getSize();
   for(var i = 0; i < size; i++) {
      this.eventListeners.get(i).stackChanged(event);
      }
   };
draw2d.CommandStackEvent = function(_4316, _4317) {
   this.command = _4316;
   this.details = _4317;
   };
draw2d.CommandStackEvent.prototype.type = "CommandStackEvent";
draw2d.CommandStackEvent.prototype.getCommand = function() {
   return this.command;
   };
draw2d.CommandStackEvent.prototype.getDetails = function() {
   return this.details;
   };
draw2d.CommandStackEvent.prototype.isPostChangeEvent = function() {
   return 0 != (this.getDetails() & draw2d.CommandStack.POST_MASK);
   };
draw2d.CommandStackEvent.prototype.isPreChangeEvent = function() {
   return 0 != (this.getDetails() & draw2d.CommandStack.PRE_MASK);
   };
draw2d.CommandStackEventListener = function() {
   };
draw2d.CommandStackEventListener.prototype.type = "CommandStackEventListener";
draw2d.CommandStackEventListener.prototype.stackChanged = function(event) {
   };
draw2d.CommandAdd = function(_5359, _535a, x, y, _535d) {
   draw2d.Command.call(this, "add figure");
   this.parent = _535d;
   this.figure = _535a;
   this.x = x;
   this.y = y;
   this.workflow = _5359;
   };
draw2d.CommandAdd.prototype = new draw2d.Command;
draw2d.CommandAdd.prototype.type = "CommandAdd";
draw2d.CommandAdd.prototype.execute = function() {
   this.redo();
   };
draw2d.CommandAdd.prototype.redo = function() {
   if(this.x && this.y) {
      this.workflow.addFigure(this.figure, this.x, this.y);
      }
   else {
      this.workflow.addFigure(this.figure);
      }
   this.workflow.setCurrentSelection(this.figure);
   if(this.parent != null) {
      this.parent.addChild(this.figure);
      }
   };
draw2d.CommandAdd.prototype.undo = function() {
   this.workflow.removeFigure(this.figure);
   this.workflow.setCurrentSelection(null);
   if(this.parent != null) {
      this.parent.removeChild(this.figure);
      }
   };
draw2d.CommandDelete = function(_47ca) {
   draw2d.Command.call(this, "delete figure");
   this.parent = _47ca.parent;
   this.figure = _47ca;
   this.workflow = _47ca.workflow;
   this.connections = null;
   };
draw2d.CommandDelete.prototype = new draw2d.Command;
draw2d.CommandDelete.prototype.type = "CommandDelete";
draw2d.CommandDelete.prototype.execute = function() {
   this.redo();
   };
draw2d.CommandDelete.prototype.undo = function() {
   this.workflow.addFigure(this.figure);
   if(this.figure instanceof draw2d.Connection) {
      this.figure.reconnect();
      }
   this.workflow.setCurrentSelection(this.figure);
   if(this.parent != null) {
      this.parent.addChild(this.figure);
      }
   for(var i = 0; i < this.connections.getSize(); ++i) {
      this.workflow.addFigure(this.connections.get(i));
      this.connections.get(i).reconnect();
      }
   };
draw2d.CommandDelete.prototype.redo = function() {
   this.workflow.removeFigure(this.figure);
   this.workflow.setCurrentSelection(null);
   if(this.figure.getPorts && this.connections == null) {
      this.connections = new draw2d.ArrayList();
      var ports = this.figure.getPorts();
      for(var i = 0; i < ports.getSize(); i++) {
         if(ports.get(i).getConnections) {
            this.connections.addAll(ports.get(i).getConnections());
            }
         }
      }
   if(this.connections == null) {
      this.connections = new draw2d.ArrayList();
      }
   if(this.parent != null) {
      this.parent.removeChild(this.figure);
      }
   for(var i = 0; i < this.connections.getSize(); ++i) {
      this.workflow.removeFigure(this.connections.get(i));
      }
   };
draw2d.CommandMove = function(_5509, x, y) {
   draw2d.Command.call(this, "move figure");
   this.figure = _5509;
   this.oldX = x;
   this.oldY = y;
   this.oldCompartment = _5509.getParent();
   };
draw2d.CommandMove.prototype = new draw2d.Command;
draw2d.CommandMove.prototype.type = "CommandMove";
draw2d.CommandMove.prototype.setPosition = function(x, y) {
   this.newX = x;
   this.newY = y;
   this.newCompartment = this.figure.workflow.getBestCompartmentFigure(x, y, this.figure);
   };
draw2d.CommandMove.prototype.canExecute = function() {
   return this.newX != this.oldX || this.newY != this.oldY;
   };
draw2d.CommandMove.prototype.execute = function() {
   this.redo();
   };
draw2d.CommandMove.prototype.undo = function() {
   this.figure.setPosition(this.oldX, this.oldY);
   if(this.newCompartment != null) {
      this.newCompartment.removeChild(this.figure);
      }
   if(this.oldCompartment != null) {
      this.oldCompartment.addChild(this.figure);
      }
   this.figure.workflow.moveResizeHandles(this.figure);
   };
draw2d.CommandMove.prototype.redo = function() {
   this.figure.setPosition(this.newX, this.newY);
   if(this.oldCompartment != null) {
      this.oldCompartment.removeChild(this.figure);
      }
   if(this.newCompartment != null) {
      this.newCompartment.addChild(this.figure);
      }
   this.figure.workflow.moveResizeHandles(this.figure);
   };
draw2d.CommandResize = function(_47a6, width, _47a8) {
   draw2d.Command.call(this, "resize figure");
   this.figure = _47a6;
   this.oldWidth = width;
   this.oldHeight = _47a8;
   };
draw2d.CommandResize.prototype = new draw2d.Command;
draw2d.CommandResize.prototype.type = "CommandResize";
draw2d.CommandResize.prototype.setDimension = function(width, _47aa) {
   this.newWidth = width;
   this.newHeight = _47aa;
   };
draw2d.CommandResize.prototype.canExecute = function() {
   return this.newWidth != this.oldWidth || this.newHeight != this.oldHeight;
   };
draw2d.CommandResize.prototype.execute = function() {
   this.redo();
   };
draw2d.CommandResize.prototype.undo = function() {
   this.figure.setDimension(this.oldWidth, this.oldHeight);
   this.figure.workflow.moveResizeHandles(this.figure);
   };
draw2d.CommandResize.prototype.redo = function() {
   this.figure.setDimension(this.newWidth, this.newHeight);
   this.figure.workflow.moveResizeHandles(this.figure);
   };
draw2d.CommandSetText = function(_53ea, text) {
   draw2d.Command.call(this, "set text");
   this.figure = _53ea;
   this.newText = text;
   this.oldText = _53ea.getText();
   };
draw2d.CommandSetText.prototype = new draw2d.Command;
draw2d.CommandSetText.prototype.type = "CommandSetText";
draw2d.CommandSetText.prototype.execute = function() {
   this.redo();
   };
draw2d.CommandSetText.prototype.redo = function() {
   this.figure.setText(this.newText);
   };
draw2d.CommandSetText.prototype.undo = function() {
   this.figure.setText(this.oldText);
   };
draw2d.CommandSetColor = function(_4758, color) {
   draw2d.Command.call(this, "set color");
   this.figure = _4758;
   this.newColor = color;
   this.oldColor = _4758.getColor();
   };
draw2d.CommandSetColor.prototype = new draw2d.Command;
draw2d.CommandSetColor.prototype.type = "CommandSetColor";
draw2d.CommandSetColor.prototype.execute = function() {
   this.redo();
   };
draw2d.CommandSetColor.prototype.undo = function() {
   this.figure.setColor(this.oldColor);
   };
draw2d.CommandSetColor.prototype.redo = function() {
   this.figure.setColor(this.newColor);
   };
draw2d.CommandSetBackgroundColor = function(_590d, color) {
   draw2d.Command.call(this, "set background color");
   this.figure = _590d;
   this.newColor = color;
   this.oldColor = _590d.getBackgroundColor();
   };
draw2d.CommandSetBackgroundColor.prototype = new draw2d.Command;
draw2d.CommandSetBackgroundColor.prototype.type = "CommandSetBackgroundColor";
draw2d.CommandSetBackgroundColor.prototype.execute = function() {
   this.redo();
   };
draw2d.CommandSetBackgroundColor.prototype.undo = function() {
   this.figure.setBackgroundColor(this.oldColor);
   };
draw2d.CommandSetBackgroundColor.prototype.redo = function() {
   this.figure.setBackgroundColor(this.newColor);
   };
draw2d.CommandConnect = function(_4a23, _4a24, _4a25) {
   draw2d.Command.call(this, "create connection");
   this.workflow = _4a23;
   this.source = _4a24;
   this.target = _4a25;
   this.connection = null;
   };
draw2d.CommandConnect.prototype = new draw2d.Command;
draw2d.CommandConnect.prototype.type = "CommandConnect";
draw2d.CommandConnect.prototype.setConnection = function(_4a26) {
   this.connection = _4a26;
   };
draw2d.CommandConnect.prototype.execute = function() {
   if(this.connection == null) {
      this.connection = new draw2d.Connection();
      }
   this.connection.setSource(this.source);
   this.connection.setTarget(this.target);
   this.workflow.addFigure(this.connection);
   };
draw2d.CommandConnect.prototype.redo = function() {
   this.workflow.addFigure(this.connection);
   this.connection.reconnect();
   };
draw2d.CommandConnect.prototype.undo = function() {
   this.workflow.removeFigure(this.connection);
   };
draw2d.CommandReconnect = function(con) {
   draw2d.Command.call(this, "reconnect connection");
   this.con = con;
   this.oldSourcePort = con.getSource();
   this.oldTargetPort = con.getTarget();
   this.oldRouter = con.getRouter();
   };
draw2d.CommandReconnect.prototype = new draw2d.Command;
draw2d.CommandReconnect.prototype.type = "CommandReconnect";
draw2d.CommandReconnect.prototype.canExecute = function() {
   return true;
   };
draw2d.CommandReconnect.prototype.setNewPorts = function(_535f, _5360) {
   this.newSourcePort = _535f;
   this.newTargetPort = _5360;
   };
draw2d.CommandReconnect.prototype.execute = function() {
   this.redo();
   };
draw2d.CommandReconnect.prototype.undo = function() {
   this.con.setSource(this.oldSourcePort);
   this.con.setTarget(this.oldTargetPort);
   this.con.setRouter(this.oldRouter);
   if(this.con.getWorkflow().getCurrentSelection() == this.con) {
      this.con.getWorkflow().showLineResizeHandles(this.con);
      }
   };
draw2d.CommandReconnect.prototype.redo = function() {
   this.con.setSource(this.newSourcePort);
   this.con.setTarget(this.newTargetPort);
   this.con.setRouter(this.oldRouter);
   if(this.con.getWorkflow().getCurrentSelection() == this.con) {
      this.con.getWorkflow().showLineResizeHandles(this.con);
      }
   };
draw2d.CommandMoveLine = function(line, _5910, _5911, endX, endY) {
   draw2d.Command.call(this, "move line");
   this.line = line;
   this.startX1 = _5910;
   this.startY1 = _5911;
   this.endX1 = endX;
   this.endY1 = endY;
   };
draw2d.CommandMoveLine.prototype = new draw2d.Command;
draw2d.CommandMoveLine.prototype.type = "CommandMoveLine";
draw2d.CommandMoveLine.prototype.canExecute = function() {
   return this.startX1 != this.startX2 || this.startY1 != this.startY2 || this.endX1 != this.endX2 || this.endY1 != this.endY2;
   };
draw2d.CommandMoveLine.prototype.setEndPoints = function(_5914, _5915, endX, endY) {
   this.startX2 = _5914;
   this.startY2 = _5915;
   this.endX2 = endX;
   this.endY2 = endY;
   };
draw2d.CommandMoveLine.prototype.execute = function() {
   this.redo();
   };
draw2d.CommandMoveLine.prototype.undo = function() {
   this.line.setStartPoint(this.startX1, this.startY1);
   this.line.setEndPoint(this.endX1, this.endY1);
   if(this.line.workflow.getCurrentSelection() == this.line) {
      this.line.workflow.showLineResizeHandles(this.line);
      }
   };
draw2d.CommandMoveLine.prototype.redo = function() {
   this.line.setStartPoint(this.startX2, this.startY2);
   this.line.setEndPoint(this.endX2, this.endY2);
   if(this.line.workflow.getCurrentSelection() == this.line) {
      this.line.workflow.showLineResizeHandles(this.line);
      }
   };
draw2d.Menu = function() {
   this.menuItems = new draw2d.ArrayList();
   draw2d.Figure.call(this);
   this.setSelectable(false);
   this.setDeleteable(false);
   this.setCanDrag(false);
   this.setResizeable(false);
   this.setSelectable(false);
   this.setZOrder(10000);
   this.dirty = false;
   };
draw2d.Menu.prototype = new draw2d.Figure;
draw2d.Menu.prototype.type = "Menu";
draw2d.Menu.prototype.createHTMLElement = function() {
   var item = document.createElement("div");
   item.style.position = "absolute";
   item.style.left = this.x + "px";
   item.style.top = this.y + "px";
   item.style.margin = "0px";
   item.style.padding = "0px";
   item.style.zIndex = "" + draw2d.Figure.ZOrderBaseIndex;
   item.style.border = "1px solid gray";
   item.style.background = "lavender";
   item.style.cursor = "pointer";
   return item;
   };
draw2d.Menu.prototype.setWorkflow = function(_45be) {
   this.workflow = _45be;
   };
draw2d.Menu.prototype.appendMenuItem = function(item) {
   this.menuItems.add(item);
   item.parentMenu = this;
   this.dirty = true;
   };
draw2d.Menu.prototype.getHTMLElement = function() {
   var html = draw2d.Figure.prototype.getHTMLElement.call(this);
   if(this.dirty) {
      this.createList();
      }
   return html;
   };
draw2d.Menu.prototype.createList = function() {
   this.dirty = false;
   this.html.innerHTML = "";
   var oThis = this;
   for(var i = 0; i < this.menuItems.getSize(); i++) {
      var item = this.menuItems.get(i);
      var li = document.createElement("a");
      li.innerHTML = item.getLabel();
      li.style.display = "block";
      li.style.fontFamily = "Verdana, Arial, Helvetica, sans-serif";
      li.style.fontSize = "9pt";
      li.style.color = "dimgray";
      li.style.borderBottom = "1px solid silver";
      li.style.paddingLeft = "5px";
      li.style.paddingRight = "5px";
      li.style.cursor = "pointer";
      this.html.appendChild(li);
      li.menuItem = item;
      if(li.addEventListener) {
         li.addEventListener("click", function(event) {
            var _45c6 = arguments[0] || window.event; _45c6.cancelBubble = true; _45c6.returnValue = false; var diffX = _45c6.clientX; var diffY = _45c6.clientY; var _45c9 = document.body.parentNode.scrollLeft; var _45ca = document.body.parentNode.scrollTop; this.menuItem.execute(diffX + _45c9, diffY + _45ca); }
         , false);
         li.addEventListener("mouseup", function(event) {
            event.cancelBubble = true; event.returnValue = false; }
         , false);
         li.addEventListener("mousedown", function(event) {
            event.cancelBubble = true; event.returnValue = false; }
         , false);
         li.addEventListener("mouseover", function(event) {
            this.style.backgroundColor = "silver"; }
         , false);
         li.addEventListener("mouseout", function(event) {
            this.style.backgroundColor = "transparent"; }
         , false);
         }
      else {
         if(li.attachEvent) {
            li.attachEvent("onclick", function(event) {
               var _45d0 = arguments[0] || window.event; _45d0.cancelBubble = true; _45d0.returnValue = false; var diffX = _45d0.clientX; var diffY = _45d0.clientY; var _45d3 = document.body.parentNode.scrollLeft; var _45d4 = document.body.parentNode.scrollTop; event.srcElement.menuItem.execute(diffX + _45d3, diffY + _45d4); }
            );
            li.attachEvent("onmousedown", function(event) {
               event.cancelBubble = true; event.returnValue = false; }
            );
            li.attachEvent("onmouseup", function(event) {
               event.cancelBubble = true; event.returnValue = false; }
            );
            li.attachEvent("onmouseover", function(event) {
               event.srcElement.style.backgroundColor = "silver"; }
            );
            li.attachEvent("onmouseout", function(event) {
               event.srcElement.style.backgroundColor = "transparent"; }
            );
            }
         }
      }
   };
draw2d.MenuItem = function(label, _4660, _4661) {
   this.label = label;
   this.iconUrl = _4660;
   this.parentMenu = null;
   this.action = _4661;
   };
draw2d.MenuItem.prototype.type = "MenuItem";
draw2d.MenuItem.prototype.isEnabled = function() {
   return true;
   };
draw2d.MenuItem.prototype.getLabel = function() {
   return this.label;
   };
draw2d.MenuItem.prototype.execute = function(x, y) {
   this.parentMenu.workflow.showMenu(null);
   this.action(x, y);
   };
draw2d.Locator = function() {
   };
draw2d.Locator.prototype.type = "Locator";
draw2d.Locator.prototype.relocate = function(_58eb) {
   };
draw2d.ConnectionLocator = function(_4d48) {
   draw2d.Locator.call(this);
   this.connection = _4d48;
   };
draw2d.ConnectionLocator.prototype = new draw2d.Locator;
draw2d.ConnectionLocator.prototype.type = "ConnectionLocator";
draw2d.ConnectionLocator.prototype.getConnection = function() {
   return this.connection;
   };
draw2d.ManhattenMidpointLocator = function(_42f9) {
   draw2d.ConnectionLocator.call(this, _42f9);
   };
draw2d.ManhattenMidpointLocator.prototype = new draw2d.ConnectionLocator;
draw2d.ManhattenMidpointLocator.prototype.type = "ManhattenMidpointLocator";
draw2d.ManhattenMidpointLocator.prototype.relocate = function(_42fa) {
   var conn = this.getConnection();
   var p = new draw2d.Point();
   var _42fd = conn.getPoints();
   var index = Math.floor((_42fd.getSize() - 2) / 2);
   var p1 = _42fd.get(index);
   var p2 = _42fd.get(index + 1);
   p.x = (p2.x - p1.x) / 2 + p1.x + 5;
   p.y = (p2.y - p1.y) / 2 + p1.y + 5;
   _42fa.setPosition(p.x, p.y);
   };

