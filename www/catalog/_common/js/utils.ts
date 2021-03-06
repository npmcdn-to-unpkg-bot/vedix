/// <reference path="../../../core/libs/_def/jquery.d.ts"/>

import $ = require('jquery');
import Notifications = require('./notifications');

class Utils {
	
	static winErr: JQuery = null;
	static uid: number = 0;
	
	private static __constructor = (()=>{
	  $(document).on('click', (ev)=>{
	    if ($(ev.target).closest('.popup-system-error').length) return;
	    $('.popup-system-error').remove();
	  });
	})();
	
	public static str_replace(search: string, replace: string, subject: string): string {
		return subject.split(search).join(replace);
	}

	/**
	 * Преобразовать текстовый ответ сервера в объект (JSON)
	 */
	public static getJSONbyText(_data: any, w?: number, h?: number): any {
		
		try {
			var data: any;
			if (typeof _data == "object") data = _data; else eval('data = '+_data+';');
			if (data.warning) {
			  Notifications.show(data.warning, Notifications.Types.ntWarning);
				//alert(Utils.urldecode(data.msg).replace(/%0D%0A/g, '\n').replace(/%0A/g, '\n'));
			}
			if ((data.error) || (data.err)) {
			  Notifications.show(data.error?data.error:'' + data.err?data.err:'', Notifications.Types.ntError);
				//alert(Utils.urldecode(data.err).replace(/%0D%0A/g, '\n').replace(/%0A/g, '\n'));
				//return null;
			}
			if (((data.success) && (data.success_showmsg)) || (data.msg)) {
			  Notifications.show(data.success?data.success:'' + data.msg?data.msg:'', Notifications.Types.ntSuccess);
			}
			return data;
		} catch (e) {
			var id_winerr = 'id_winerr'+(++Utils.uid);
			if (! w) w = 580;
			if (! h) h = 400;
			
			var body = '';
			if (_data.match(/<html>/)) {
				_data = _data.replace(/<html>/, '').replace(/<\/html>/, '').replace(/<title>[^>]*>/, '').replace(/<style>[^>]*>/, '');
				body = '\
<div id="'+id_winerr+'" class="popup-system-error" style="z-index: '+(Utils.uid+1000)+'; position: fixed; border: 2px outset #fff; background-color: #f7f7f6; display: none; left: 50px; width: '+w+'px">\n\
	'+_data+'\n\
</div>';
			} else {
				body = '\
<div id="'+id_winerr+'" class="popup-system-error" style="z-index: '+(Utils.uid+1000)+'; position: fixed; border: 2px outset #fff; background-color: #f7f7f6; display: none; left: 50px; width: '+w+'px">\n\
	<table id="'+id_winerr+'_head" cellspacing="0px" width="100%" style="border: 2px ouset #aaa; background-color: #eee">\n\
		<tr style="cursor: move">\n\
			<td width="100%" class="f10b cn" style="padding: 3px">Произошла ошибка!</td>\n\
			<td class="cn" onclick="$(\'#'+id_winerr+'\').remove(); winErr = null;"><input type="button" style="width: 20px" value="X"/></td>\n\
		</tr>\n\
	</table>\n\
	<div style="padding: 7px; height: '+h+'px; overflow: auto">'+_data+'</div>\n\
	<div>\n\
		<table>\n\
			<tr>\n\
				<td width="50%"></td>\n\
				<td>\n\
					<div class="cn">\n\
						<input type="button" style="width: 70px; margin-top: 10px; margin-bottom: 10px" value="Закрыть" onclick="$(\'#'+id_winerr+'\').remove(); winErr = null;"/>\n\
					</div>\n\
				</td>\n\
				<td width="50%"></td>\n\
			</tr>\n\
		</table>\n\
	</div>\n\
</div>';
			}
			
			
			Utils.winErr = $(body);
			Utils.winErr.appendTo('body');//.draggable({handle: '#'+id_winerr+'_head', opacity:0.5});
			var win = $('#'+id_winerr);
			win.css('left', Math.floor($('body').width() / 2 - w / 2) );
			win.css('top', Math.floor(h/4)+'px');
			win.fadeIn(250);
		}
		return 0;
	}
}

export = Utils;