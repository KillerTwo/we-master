package org.wm.auth.code.sms.sendor;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.ServletWebRequest;
import org.wm.auth.code.sms.SmsProperty;

import java.util.TreeMap;

@Component
@RequiredArgsConstructor
public class AliyunSmsSender implements SmsSender {

    private final SmsProperty smsProperty;

    @Override
    public String sender(ServletWebRequest request, String smsTemplate, String[] mobiles, String code) {
        return null;
    }

    @Override
    public String sender(ServletWebRequest request, String smsTemplate, String[] mobiles, TreeMap<String, Object> param) {
        return null;
    }
}
