import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { moderateScale } from 'react-native-size-matters';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';

import AppButton from '../../../../components/AppButton';
import BackButton from '../../../../components/BackButton';
import FormInput from '../../../../components/FormInput';

import { toastError, toastSuccess } from '../../../../services/toast';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import { openGallery } from '../../../../utils/functions';
import { useHelp } from '../../../../hooks/useHelp';

const helpCenterSchema = yup.object({
  category: yup.string().required('Please select an issue category'),

  subject: yup
    .string()
    .trim()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters'),

  description: yup
    .string()
    .trim()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),

  priority: yup.string().required('Please select priority'),

  tripId: yup.string().trim().optional(),
});

type HelpFormValues = {
  category: string;
  subject: string;
  description: string;
  priority: string;
  tripId: string;
};

type Attachment = {
  uri: string;
  fileName?: string;
  type?: string;
};

const CATEGORIES = [
  { label: 'Booking Issue', value: 'BOOKING' },
  { label: 'Driver Issue', value: 'DRIVER' },
  { label: 'Payment Issue', value: 'PAYMENT' },
  { label: 'Account Issue', value: 'ACCOUNT' },
  { label: 'App Problem', value: 'APP_PROBLEM' },
  { label: 'Emergency', value: 'EMERGENCY' },
  { label: 'Other', value: 'OTHER' },
];

const PRIORITIES = [
  { label: 'Low', value: 'LOW' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'High', value: 'HIGH' },
];

const HelpCenter = () => {
  const styles = useGlobalStyles();

  const { createSupportTicket } = useHelp();

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HelpFormValues>({
    resolver: yupResolver(helpCenterSchema),
    defaultValues: {
      category: '',
      subject: '',
      description: '',
      priority: 'MEDIUM',
      tripId: '',
    },
  });

  // -----------------------------------------
  // PICK IMAGES
  // -----------------------------------------

  const pickImages = async () => {
    if (attachments.length >= 3) {
      toastError(
        'You can upload a maximum of 3 screenshots.',
        'Maximum reached',
      );
      return;
    }

    const result = await openGallery(3 - attachments.length);

    if (result) {
      const images = result.map((item: any) => ({
        uri: item.uri,
        fileName: item.fileName,
        type: item.type,
      }));

      setAttachments(prev => [...prev, ...images]);
    }
  };

  // -----------------------------------------
  // REMOVE IMAGE
  // -----------------------------------------

  const removeAttachment = (index: number) => {
    setAttachments(prev =>
      prev.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  // -----------------------------------------
  // INVALID FORM
  // -----------------------------------------

  const onInvalid = (formErrors: any) => {
    console.log('Validation errors:', formErrors);
  };

  // -----------------------------------------
  // SUBMIT
  // -----------------------------------------

  const onSubmit = async (values: HelpFormValues) => {
    try {
      setLoading(true);

      console.log('FORM VALUES:', values);

      const formData = new FormData();

      formData.append('category', values.category);

      formData.append('subject', values.subject.trim());

      formData.append('description', values.description.trim());

      formData.append('priority', values.priority);

      if (values.tripId?.trim()) {
        formData.append('tripId', values.tripId.trim());
      }

      attachments.forEach((image, index) => {
        formData.append('attachments', {
          uri: image.uri,
          name: image.fileName || `attachment-${index}.jpg`,
          type: image.type || 'image/jpeg',
        } as any);
      });

      await createSupportTicket(formData);

      reset({
        category: '',
        subject: '',
        description: '',
        priority: 'MEDIUM',
        tripId: '',
      });

      setAttachments([]);
    } catch (error: any) {
      console.log(error?.response?.data, 'HELP CENTER ERROR');

      Alert.alert(
        'Unable to Submit',
        error?.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.card, globalStyles.flex]}>
      <BackButton title="Help Center" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          globalStyles.paddingH15,
          globalStyles.paddingB15,
        ]}
      >
        {/* -----------------------------------------
            HEADER
        ----------------------------------------- */}

        <View style={globalStyles.mT10}>
          <Text style={[styles.text, styles.h6]}>How can we help?</Text>

          <Text style={[styles.lightText, globalStyles.mT10]}>
            Tell us what went wrong and our support team will get back to you.
          </Text>
        </View>

        {/* -----------------------------------------
            CATEGORY
        ----------------------------------------- */}

        <View style={globalStyles.mT20}>
          <Text style={[styles.h5, globalStyles.mB10]}>Issue Category</Text>

          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <View
                style={[
                  styles.card,
                  styles.border,
                  {
                    overflow: 'hidden',
                  },
                ]}
              >
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.smallText}
                  dropdownIconColor={styles.text.color}
                >
                  <Picker.Item label="Select issue category" value="" />

                  {CATEGORIES.map(category => (
                    <Picker.Item
                      key={category.value}
                      label={category.label}
                      value={category.value}
                    />
                  ))}
                </Picker>
              </View>
            )}
          />

          {errors.category && (
            <Text style={[styles.smallText, styles.link, globalStyles.mT5]}>
              {errors.category.message}
            </Text>
          )}
        </View>

        {/* -----------------------------------------
            SUBJECT
        ----------------------------------------- */}

        <View style={globalStyles.mT15}>
          <FormInput
            control={control}
            name="subject"
            label="Issue Subject"
            placeholder="e.g. Driver did not arrive"
          />
        </View>

        {/* -----------------------------------------
            DESCRIPTION
        ----------------------------------------- */}

        <View style={globalStyles.mT10}>
          <FormInput
            control={control}
            name="description"
            label="Description"
            placeholder="Please describe the issue in detail..."
            multiline
            numberOfLines={5}
          />
        </View>

        {/* -----------------------------------------
            TRIP ID
        ----------------------------------------- */}

        <View style={globalStyles.mT10}>
          <FormInput
            control={control}
            name="tripId"
            label="Booking / Trip ID"
            placeholder="Optional"
          />

          <Text style={[styles.smallText, globalStyles.mT5]}>
            Add the booking ID if your issue is related to a trip.
          </Text>
        </View>

        {/* -----------------------------------------
            PRIORITY
        ----------------------------------------- */}

        <View style={globalStyles.mT20}>
          <Text style={[styles.h6, globalStyles.mB10]}>Priority</Text>

          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <View
                style={[
                  styles.card,
                  styles.border,
                  {
                    overflow: 'hidden',
                  },
                ]}
              >
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  dropdownIconColor={styles.text.color}
                  style={[globalStyles.row, styles.smallText]}
                >
                  {PRIORITIES.map(priority => (
                    <Picker.Item
                      key={priority.value}
                      label={priority.label}
                      value={priority.value}
                    />
                  ))}
                </Picker>
              </View>
            )}
          />

          {errors.priority && (
            <Text style={[styles.smallText, styles.link, globalStyles.mT5]}>
              {errors.priority.message}
            </Text>
          )}
        </View>

        {/* -----------------------------------------
            SCREENSHOTS
        ----------------------------------------- */}

        <View style={globalStyles.mT20}>
          <Text style={[globalStyles.mB5, styles.h6]}>Screenshots</Text>

          <Text
            style={[globalStyles.mB10, styles.smallText, styles.opacitylow]}
          >
            Optional. You can upload up to 3 screenshots.
          </Text>

          <View style={[globalStyles.row, globalStyles.flexWrap, { gap: 10 }]}>
            {attachments.map((image, index) => (
              <View
                key={`${image.uri}-${index}`}
                style={[
                  globalStyles.widthHeight90,
                  styles.border,
                  {
                    overflow: 'hidden',
                    position: 'relative',
                  },
                ]}
              >
                <Image
                  source={{
                    uri: image.uri,
                  }}
                  style={globalStyles.fullWidthHeight}
                  resizeMode="contain"
                />

                <Pressable
                  onPress={() => removeAttachment(index)}
                  style={styles.absoluteImages}
                >
                  <MaterialDesignIcons
                    name="close"
                    size={moderateScale(15)}
                    color={styles.text.color}
                  />
                </Pressable>
              </View>
            ))}

            {attachments.length < 3 && (
              <Pressable
                onPress={pickImages}
                style={[
                  globalStyles.widthHeight90,
                  globalStyles.alignCenter,
                  globalStyles.justifyCenter,
                  styles.borderDashed,
                ]}
              >
                <MaterialDesignIcons
                  name="camera-plus-outline"
                  size={28}
                  color="#777777"
                />

                <Text style={styles.smallText}>Add image</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* -----------------------------------------
            EMERGENCY NOTICE
        ----------------------------------------- */}

        <View
          style={[
            globalStyles.mT20,
            globalStyles.padding10,
            globalStyles.row,
            styles.border,
          ]}
        >
          <MaterialDesignIcons
            name="alert-circle-outline"
            size={22}
            color="#D32F2F"
          />

          <Text
            style={[
              globalStyles.flex,
              globalStyles.mL10,
              styles.smallText,
              styles.link,
            ]}
          >
            For an immediate medical emergency, do not wait for a support
            response. Use the emergency booking option in the app.
          </Text>
        </View>

        {/* -----------------------------------------
            SUBMIT
        ----------------------------------------- */}

        <View style={globalStyles.mT20}>
          <AppButton
            title={loading ? 'Submitting...' : 'Submit Issue'}
            onPress={handleSubmit(onSubmit, onInvalid)}
            variant="primary"
            disabled={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpCenter;
