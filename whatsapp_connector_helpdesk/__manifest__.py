# -*- coding: utf-8 -*-
# =====================================================================================
# License: OPL-1 (Odoo Proprietary License v1.0)
#
# By using or downloading this module, you agree not to make modifications that
# affect sending messages through Acruxlab or avoiding contract a Plan with Acruxlab.
# Support our work and allow us to keep improving this module and the service!
#
# Al utilizar o descargar este módulo, usted se compromete a no realizar modificaciones que
# afecten el envío de mensajes a través de Acruxlab o a evitar contratar un Plan con Acruxlab.
# Apoya nuestro trabajo y permite que sigamos mejorando este módulo y el servicio!
# =====================================================================================

{
    'name': 'ChatRoom WhatsApp HelpDesk Ticket. Real All in One',
    'summary': 'Create HelpDesk Ticket from ChatRoom. Send message from Ticket. WhatsApp integration. WhatsApp Connector. apichat.io GupShup Chat-Api ChatApi. ChatRoom 2.0.',
    'description': 'Create HelpDesk Ticket from ChatRoom. Send message from Ticket. WhatsApp integration. WhatsApp Connector. apichat.io. GupShup. Chat-Api. ChatApi. ChatRoom 2.0.',
    'version': '14.0.2',
    'author': 'AcruxLab',
    # 'live_test_url': 'https://chatroom.acruxlab.com/web/signup',
    'support': 'info@acruxlab.com',
    'price': 100.0,
    'currency': 'USD',
    'images': ['static/description/Banner_helpdesk_v7.gif'],
    'website': 'https://acruxlab.com',
    'license': 'OPL-1',
    'application': True,
    'installable': True,
    'category': 'Discuss/Services/CRM',
    'depends': [
        'whatsapp_connector',
        'helpdesk',
    ],
    'data': [
        'views/helpdesk_ticket_views.xml',
        'views/acrux_chat_conversation_views.xml',
        'views/include_template.xml',
    ],
    'qweb': [
        'static/src/xml/acrux_chat_template.xml',
    ],
}
