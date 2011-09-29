/*
 * RailsAdmin filtering multiselect @VERSION
 *
 * License
 *
 * http://www.railsadmin.org
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function(a){a.widget("ra.filteringMultiselect",{_cache:{},options:{createQuery:function(a){return{query:a}},sortable:!1,regional:{up:"Up",down:"Down",add:"Add",chooseAll:"Choose all",chosen:"Chosen records",clearAll:"Clear all",remove:"Remove",selectChoice:"Select your choice(s) and click"},searchDelay:400,source:null},_create:function(){this._cache={},this._build(),this._buildCache(),this._bindEvents()},_build:function(){var b;this.wrapper=a('<div class="ra-multiselect">'),this.wrapper.insertAfter(this.element),this.header=a('<div class="ra-multiselect-header ui-helper-clearfix">'),this.filter=a('<input type="search" class="ra-multiselect-search"/>'),this.header.append(this.filter).append('<div class="help"><strong>'+this.options.regional.chosen+"</strong><br />"+this.options.regional.selectChoice+'</div><div class="ui-icon ui-icon-circle-triangle-e"></div>'),this.wrapper.append(this.header),this.columns={left:a('<div class="ra-multiselect-column ra-multiselect-left">'),center:a('<div class="ra-multiselect-column ra-multiselect-center">'),right:a('<div class="ra-multiselect-column ra-multiselect-right">')};for(b in this.columns)this.columns.hasOwnProperty(b)&&this.wrapper.append(this.columns[b]);this.collection=a('<select multiple="multiple"></select>'),this.collection.addClass("ra-multiselect-collection"),this.addAll=a('<a class="ra-multiselect-item-add-all"><span class="ui-icon ui-icon-circle-triangle-e"></span>'+this.options.regional.chooseAll+"</a>"),this.columns.left.append(this.collection).append(this.addAll),this.add=a('<a class="ui-icon ui-icon-circle-triangle-e ra-multiselect-item-add">'+this.options.regional.add+"</a>"),this.remove=a('<a class="ui-icon ui-icon-circle-triangle-w ra-multiselect-item-remove">'+this.options.regional.remove+"</a>"),this.columns.center.append(this.add).append(this.remove),this.options.sortable&&(this.up=a('<a class="ui-icon ui-icon-circle-triangle-n ra-multiselect-item-up">'+this.options.regional.up+"</a>"),this.down=a('<a class="ui-icon ui-icon-circle-triangle-s ra-multiselect-item-down">'+this.options.regional.down+"</a>"),this.columns.center.append(this.up).append(this.down)),this.selection=a('<select class="ra-multiselect-selection" multiple="multiple"></select>'),this.removeAll=a('<a class="ra-multiselect-item-remove-all"><span class="ui-icon ui-icon-circle-triangle-w"></span>'+this.options.regional.clearAll+"</a>"),this.columns.right.append(this.selection).append(this.removeAll),this.element.css({display:"none"})},_bindEvents:function(){var b=this;this.addAll.click(function(c){b._select(a("option",b.collection))}),this.add.click(function(c){b._select(a(":selected",b.collection))}),this.removeAll.click(function(c){b._deSelect(a("option",b.selection))}),this.remove.click(function(c){b._deSelect(a(":selected",b.selection))});var c=null;this.options.sortable&&(this.up.click(function(c){b._move("up",a(":selected",b.selection))}),this.down.click(function(c){b._move("down",a(":selected",b.selection))})),this.filter.keyup(function(a){c&&clearTimeout(c);var d=function(){b._query(b.filter.val(),function(a){var c,d="";for(c in a)a.hasOwnProperty(c)&&!b.selected(a[c].id)&&(d+='<option value="'+a[c].id+'">'+a[c].label+"</option>");b.collection.html(d)})};c=setTimeout(d,b.options.searchDelay)})},_buildCache:function(b){var c=this;this.element.find("option").each(function(b,d){d.selected?(c._cache[d.value]=d.innerHTML,a(d).clone().appendTo(c.selection).attr("selected",!1)):(c._cache[d.value]=d.innerHTML,a(d).clone().appendTo(c.collection).attr("selected",!1))})},_deSelect:function(b){var c=this;b.each(function(a,b){c.element.find("option[value="+b.value+"]").removeAttr("selected")}),a(b).appendTo(this.collection).attr("selected",!1)},_query:function(b,c){var d,e=[];if(b===""){if(!this.options.source)for(d in this._cache)this._cache.hasOwnProperty(d)&&e.push({id:d,label:this._cache[d]});c.apply(this,[e])}else if(this.options.source)a.ajax({beforeSend:function(a){a.setRequestHeader("Accept","application/json")},url:this.options.source,data:this.options.createQuery(b),success:c});else{b=new RegExp(b+".*","i");for(d in this._cache)this._cache.hasOwnProperty(d)&&b.test(this._cache[d])&&e.push({id:d,label:this._cache[d]});c.apply(this,[e])}},_select:function(b){var c=this;b.each(function(b,d){var e=c.element.find("option[value="+d.value+"]");e.length?e.attr("selected","selected"):c.element.append(a('<option value="'+d.value+'" selected="selected"></option>'))}),a(b).appendTo(this.selection).attr("selected",!1)},_move:function(b,c){var d=this;b=="up"?c.each(function(b,c){var e=a(c).prev();if(e.length>0){var f=d.element.find("option[value="+c.value+"]"),g=d.element.find("option[value="+e[0].value+"]");g.before(f),e.before(a(c))}}):(a.fn.reverse=[].reverse,c.reverse().each(function(b,c){var e=a(c).next();if(e.length>0){var f=d.element.find("option[value="+c.value+"]"),g=d.element.find("option[value="+e[0].value+"]");g.after(f),e.after(a(c))}}))},selected:function(a){return this.element.find("option[value="+a+"]").attr("selected")},destroy:function(){this.wrapper.remove(),this.element.css({display:"inline"}),a.Widget.prototype.destroy.apply(this,arguments)}})})(jQuery)