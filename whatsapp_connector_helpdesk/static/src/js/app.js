odoo.define("whatsapp_connector_helpdesk.acrux_chat", (function(require) {
    "use strict";
    var chat = require("whatsapp_connector_helpdesk.chat_classes"), AcruxChatAction = require("whatsapp_connector.acrux_chat").AcruxChatAction, QWeb = require("web.core").qweb;
    AcruxChatAction.include({
        events: _.extend({}, AcruxChatAction.prototype.events, {
            "click li#tab_ticket": "tabTicket"
        }),
        _initRender: function() {
            return this._super().then((() => {
                this.$tab_content_ticket = this.$("div#tab_content_ticket > div.o_group");
            }));
        },
        tabTicket: function(_event, data) {
            let out = Promise.reject();
            if (this.selected_conversation) if (this.selected_conversation.isMine()) {
                let ticket_id = this.selected_conversation.ticket_id;
                this.saveDestroyWidget("ticket_id_form");
                let options = {
                    context: this.action.context,
                    ticket_id,
                    action_manager: this.action_manager,
                    searchButton: !0
                };
                this.ticket_id_form = new chat.TicketForm(this, options), this.$tab_content_ticket.empty(), 
                out = this.ticket_id_form.appendTo(this.$tab_content_ticket);
            } else this.$tab_content_ticket.html(QWeb.render("acrux_empty_tab", {
                notYourConv: !0
            })); else this.$tab_content_ticket.html(QWeb.render("acrux_empty_tab"));
            return out.then((() => data && data.resolve && data.resolve())), out.catch((() => data && data.reject && data.reject())), 
            out;
        },
        tabsClear: function() {
            this._super(), this.saveDestroyWidget("ticket_id_form");
        },
        _getMaximizeTabs: function() {
            let out = this._super();
            return out.push("#tab_content_ticket"), out;
        }
    });
})), odoo.define("whatsapp_connector_helpdesk.chat_classes", (function(require) {
    "use strict";
    var chat = require("whatsapp_connector.chat_classes");
    return _.extend(chat, {
        TicketForm: require("whatsapp_connector_helpdesk.ticket")
    });
})), odoo.define("whatsapp_connector_helpdesk.conversation", (function(require) {
    "use strict";
    require("whatsapp_connector.conversation").include({
        init: function(parent, options) {
            this._super.apply(this, arguments), this.ticket_id = this.options.ticket_id || [ !1, "" ];
        }
    });
})), odoo.define("whatsapp_connector_helpdesk.ticket", (function(require) {
    "use strict";
    var TicketForm = require("whatsapp_connector.form_view").extend({
        init: function(parent, options) {
            options && (options.model = "helpdesk.ticket", options.record = options.ticket_id), 
            this._super.apply(this, arguments), this.parent = parent, _.defaults(this.context, {
                default_partner_id: this.parent.selected_conversation.res_partner_id[0]
            });
        },
        start: function() {
            return this._super().then((() => this.parent.product_search.minimize()));
        },
        recordUpdated: function(record) {
            return this._super(record).then((() => {
                if (record && record.data && record.data.id) {
                    let ticket_key, partner_key, partner_id, localData;
                    ticket_key = this.acrux_form_widget.handle, localData = this.acrux_form_widget.model.localData, 
                    ticket_key && (partner_key = localData[ticket_key].data.partner_id), partner_key && (partner_id = localData[partner_key]), 
                    this.parent.setNewPartner(partner_id);
                }
            }));
        },
        recordChange: function(ticket) {
            return Promise.all([ this._super(ticket), this._rpc({
                model: this.parent.model,
                method: "write",
                args: [ [ this.parent.selected_conversation.id ], {
                    ticket_id: ticket.data.id
                } ]
            }).then((isOk => {
                if (isOk) {
                    let result = [ ticket.data.id, ticket.data.name ];
                    this.parent.selected_conversation.ticket_id = result, this.record = result;
                }
            })) ]);
        },
        _getOnSearchChatroomDomain: function() {
            let domain = this._super();
            return domain.push([ "conversation_id", "=", this.parent.selected_conversation.id ]), 
            this.parent.selected_conversation.res_partner_id && this.parent.selected_conversation.res_partner_id[0] && (domain.unshift("|"), 
            domain.push([ "partner_id", "=", this.parent.selected_conversation.res_partner_id[0] ])), 
            domain;
        }
    });
    return TicketForm;
}));