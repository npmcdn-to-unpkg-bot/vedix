import _ = require('underscore');
import $ = require('jquery');
import ko = require('knockout');
import Utils = require('./../../../_common/js/utils');
import Notifications = require('./../../../_common/js/notifications');

import Purse = require('./purse');

/**
 * VM class
 */
class VM {

	private purse: Purse;
	private positions: any;
	private deposite: KnockoutObservable<number>;

	constructor(config: any) {

		this.purse = new Purse(config, 100, 100, 100, 100);

		this.positions = [
			{ code: 'tea', name: 'чай', cost: 13, balance: ko.observable(10), ordered: ko.observable(0) },
			{ code: 'coffee', name: 'кофе', cost: 18, balance: ko.observable(20), ordered: ko.observable(0) },
			{ code: 'coffee_with_milk', name: 'кофе с молоком', cost: 21, balance: ko.observable(20), ordered: ko.observable(0) },
			{ code: 'juice', name: 'сок', cost: 35, balance: ko.observable(15), ordered: ko.observable(0) }
		];

		this.deposite = ko.observable(0);

		_.bindAll(this, 'buy');
	}

	/**
	 * Добавить монету в кошёлек VM
	 * @param nominal
	 */
	public putMonet(nominal) {
		this.purse.add(nominal);
		this.deposite( this.deposite() + nominal );
	}

	/**
	 * Вернуть сдачу. Внесенная сумма возвращается целиком, при этом сумма возвращается наименьшим кол-вом монет.
	 * @returns array
	 */
	private shortChange() {

		var result = [];

		for (var i = Purse.nominals.length; i > 0; i--) {

			if (this.deposite() == 0) break;
			var nominal: number = Purse.nominals[i - 1];

			result[nominal] = 0;

			while (this.deposite() > 0) {

				if (this.purse.get(nominal) == 0) break;

				var d: number = this.deposite();
				var diff = d - nominal;

				if (diff >= 0) {
					result[nominal]++;
					this.deposite( diff );
					this.purse.remove(nominal);
				} else {
					break;
				}
			}
		}
		return result;
	}

	/**
	 * Покупка товара
	 * @param obj
	 * @param ev
	 */
	private buy(obj: any, ev) {
		if (obj.balance() == 0) {
			alert('Товар закончился!');
			return;
		}
		if (obj.cost > this.deposite()) {
			alert('Недостаточно средств!');
			return;
		}
		obj.balance( obj.balance() - 1 );
		obj.ordered( obj.ordered() + 1 );
		this.deposite( this.deposite() - obj.cost );
		alert('Спасибо!');
	}
}

export = VM;