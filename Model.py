#!/usr/bin/env python
# coding: utf-8

# In[71]:


import os
import pandas as pd

df_aapl = pd.read_csv("AAPL.csv", engine='python')
"""df_amzn = pd.read_csv("AMZN.csv", engine='python')
df_fb = pd.read_csv("FB.csv", engine='python')
df_googl = pd.read_csv("GOOGL.csv", engine='python')
df_msft = pd.read_csv("MSFT.csv", engine='python')"""


# In[72]:


"""from matplotlib import pyplot as plt

plt.figure()
plt.plot(df_aapl["Open"])
plt.plot(df_aapl["Close"])
plt.plot(df_aapl["High"])
plt.plot(df_aapl["Low"])
plt.title('aapl stock price history')
plt.ylabel('Price (USD)')
plt.xlabel('Days')
plt.legend(['Open','High','Low','Close'], loc='upper left')
plt.show()
print("checking if any null values are present\n", df_aapl.isnull().sum())


# In[73]:


plt.plot(df_amzn["Open"])
plt.plot(df_amzn["Close"])
plt.plot(df_amzn["High"])
plt.plot(df_amzn["Low"])
plt.title('amzn stock price history')
plt.ylabel('Price (USD)')
plt.xlabel('Days')
plt.legend(['Open','High','Low','Close'], loc='upper left')
plt.show()
print("checking if any null values are present\n", df_amzn.isnull().sum())


# In[74]:


plt.plot(df_fb["Open"])
plt.plot(df_fb["Close"])
plt.plot(df_fb["High"])
plt.plot(df_fb["Low"])
plt.title('fb stock price history')
plt.ylabel('Price (USD)')
plt.xlabel('Days')
plt.legend(['Open','High','Low','Close'], loc='upper left')
plt.show()
print("checking if any null values are present\n", df_fb.isnull().sum())


# In[75]:


plt.plot(df_googl["Open"])
plt.plot(df_googl["Close"])
plt.plot(df_googl["High"])
plt.plot(df_googl["Low"])
plt.title('googl stock price history')
plt.ylabel('Price (USD)')
plt.xlabel('Days')
plt.legend(['Open','High','Low','Close'], loc='upper left')
plt.show()
print("checking if any null values are present\n", df_googl.isnull().sum())


# In[76]:


plt.plot(df_msft["Open"])
plt.plot(df_msft["Close"])
plt.plot(df_msft["High"])
plt.plot(df_msft["Low"])
plt.title('msft stock price history')
plt.ylabel('Price (USD)')
plt.xlabel('Days')
plt.legend(['Open','High','Low','Close'], loc='upper left')
plt.show()
print("checking if any null values are present\n", df_aapl.isnull().sum())"""


# In[77]:


from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
try:  # SciPy >= 0.19
    from scipy.special import comb, logsumexp
except ImportError:
    from scipy.misc import comb, logsumexp  # noq
    
train_cols = ["Open","Close","High","Low","Volume"]
min_max_scaler = MinMaxScaler()

#Prepocessing for aapl
df_train_aapl, df_test_aapl = train_test_split(df_aapl, train_size=0.8, test_size=0.2, shuffle=False)
print("Train and Test size aapl", len(df_train_aapl), len(df_test_aapl))
x_aapl = df_train_aapl.loc[:,train_cols]
x_train_aapl = min_max_scaler.fit_transform(x_aapl)
x_test_aapl = min_max_scaler.transform(df_test_aapl.loc[:,train_cols])

"""#Prepocessing for amzn
df_train_amzn, df_test_amzn = train_test_split(df_amzn, train_size=0.8, test_size=0.2, shuffle=False)
print("Train and Test size amzn", len(df_train_amzn), len(df_test_amzn))
x_amzn = df_train_amzn.loc[:,train_cols]
x_train_amzn = min_max_scaler.fit_transform(x_amzn)
x_test_amzn = min_max_scaler.transform(df_test_amzn.loc[:,train_cols])

#Prepocessing for fb
df_train_fb, df_test_fb = train_test_split(df_fb, train_size=0.8, test_size=0.2, shuffle=False)
print("Train and Test size fb", len(df_train_fb), len(df_test_fb))
x_fb = df_train_fb.loc[:,train_cols]
x_train_fb = min_max_scaler.fit_transform(x_fb)
x_test_fb = min_max_scaler.transform(df_test_fb.loc[:,train_cols])

#Prepocessing for googl
df_train_googl, df_test_googl = train_test_split(df_googl, train_size=0.8, test_size=0.2, shuffle=False)
print("Train and Test size googl", len(df_train_googl), len(df_test_googl))
x_googl = df_train_googl.loc[:,train_cols]
x_train_googl = min_max_scaler.fit_transform(x_googl)
x_test_googl = min_max_scaler.transform(df_test_googl.loc[:,train_cols])

#Prepocessing for msft
df_train_msft, df_test_msft = train_test_split(df_msft, train_size=0.8, test_size=0.2, shuffle=False)
print("Train and Test size msft", len(df_train_msft), len(df_test_msft))
x_msft = df_train_msft.loc[:,train_cols]
x_train_msft = min_max_scaler.fit_transform(x_msft)
x_test_msft = min_max_scaler.transform(df_test_msft.loc[:,train_cols])"""


# In[101]:


TIME_STEPS = 30
BATCH_SIZE = 60
#DAYS_AFTER = 10


# In[102]:


import numpy as np
from tqdm import tqdm_notebook
def build_timeseries(mat, y_col_index):
    # y_col_index is the index of column that would act as output column
    # total number of time-series samples would be len(mat) - TIME_STEPS
    dim_0 = mat.shape[0] - TIME_STEPS
    dim_1 = mat.shape[1]
    x = np.zeros((dim_0, TIME_STEPS, dim_1))
    y = np.zeros((dim_0,))
    
    for i in tqdm_notebook(range(dim_0)):
        x[i] = mat[i:TIME_STEPS+i]
        y[i] = mat[TIME_STEPS+i, y_col_index]
    print("length of time-series i/o",x.shape,y.shape)
    return x, y


# In[103]:

def trim_dataset(mat, batch_size):
    """
    trims dataset to a size that's divisible by BATCH_SIZE
    """
    no_of_rows_drop = mat.shape[0]%batch_size
    if(no_of_rows_drop > 0):
        return mat[:-no_of_rows_drop]
    else:
        return mat


# In[104]:


#Forming training, validation, and test datasets for aapl
x_t_aapl, y_t_aapl = build_timeseries(x_train_aapl, 3)
x_t_aapl = trim_dataset(x_t_aapl, BATCH_SIZE)
y_t_aapl = trim_dataset(y_t_aapl, BATCH_SIZE)
x_temp_aapl, y_temp_aapl = build_timeseries(x_test_aapl, 3)
x_val_aapl, x_test_t_aapl = np.split(trim_dataset(x_temp_aapl, BATCH_SIZE),2)
y_val_aapl, y_test_t_aapl = np.split(trim_dataset(y_temp_aapl, BATCH_SIZE),2)

"""#Forming training, validation, and test datasets for amzn
x_t_amzn, y_t_amzn = build_timeseries(x_train_amzn, 3, DAYS_AFTER)
x_t_amzn = trim_dataset(x_t_amzn, BATCH_SIZE)
y_t_amzn = trim_dataset(y_t_amzn, BATCH_SIZE)
x_temp_amzn, y_temp_amzn = build_timeseries(x_test_amzn, 3, DAYS_AFTER)
x_val_amzn, x_test_t_amzn = np.split(trim_dataset(x_temp_amzn, BATCH_SIZE),2)
y_val_amzn, y_test_t_amzn = np.split(trim_dataset(y_temp_amzn, BATCH_SIZE),2)

#Forming training, validation, and test datasets for fb
x_t_fb, y_t_fb = build_timeseries(x_train_fb, 3, DAYS_AFTER)
x_t_fb = trim_dataset(x_t_fb, BATCH_SIZE)
y_t_fb = trim_dataset(y_t_fb, BATCH_SIZE)
x_temp_fb, y_temp_fb = build_timeseries(x_test_fb, 3, DAYS_AFTER)
x_val_fb, x_test_t_fb = np.split(trim_dataset(x_temp_fb, BATCH_SIZE),2)
y_val_fb, y_test_t_fb = np.split(trim_dataset(y_temp_fb, BATCH_SIZE),2)

#Forming training, validation, and test datasets for googl
x_t_googl, y_t_googl = build_timeseries(x_train_googl, 3, DAYS_AFTER)
x_t_googl = trim_dataset(x_t_googl, BATCH_SIZE)
y_t_googl = trim_dataset(y_t_googl, BATCH_SIZE)
x_temp_googl, y_temp_googl = build_timeseries(x_test_googl, 3, DAYS_AFTER)
x_val_googl, x_test_t_googl = np.split(trim_dataset(x_temp_googl, BATCH_SIZE),2)
y_val_googl, y_test_t_googl = np.split(trim_dataset(y_temp_googl, BATCH_SIZE),2)

#Forming training, validation, and test datasets for msft
x_t_msft, y_t_msft = build_timeseries(x_train_msft, 3, DAYS_AFTER)
x_t_msft = trim_dataset(x_t_msft, BATCH_SIZE)
y_t_msft = trim_dataset(y_t_msft, BATCH_SIZE)
x_temp_msft, y_temp_msft = build_timeseries(x_test_msft, 3, DAYS_AFTER)
x_val_msft, x_test_t_msft = np.split(trim_dataset(x_temp_msft, BATCH_SIZE),2)
y_val_msft, y_test_t_msft = np.split(trim_dataset(y_temp_msft, BATCH_SIZE),2)
"""
EPOCHS = 40

# In[114]:


from keras.models import Sequential
from keras.layers.core import Dense, Dropout
from keras.layers.recurrent import LSTM
from keras import optimizers
from keras.models import model_from_json

lstm_mode_aapl = Sequential()
lstm_mode_aapl.add(LSTM(100, batch_input_shape=(BATCH_SIZE, TIME_STEPS, x_t_aapl.shape[2]), dropout=0.0, recurrent_dropout=0.0, stateful=True,     kernel_initializer='random_uniform'))
lstm_mode_aapl.add(Dropout(0.5))
lstm_mode_aapl.add(Dense(20,activation='relu'))
lstm_mode_aapl.add(Dense(1,activation='sigmoid'))
optimizer = optimizers.RMSprop(learning_rate=0.01)
lstm_mode_aapl.compile(loss='mean_squared_error', optimizer=optimizer)


# In[1]:


from keras.callbacks.callbacks import CSVLogger
csv_logger = CSVLogger(os.path.join('.', 'aapl' + '.log'), append=True)

history = lstm_mode_aapl.fit(x_t_aapl, y_t_aapl, epochs=EPOCHS, verbose=2, batch_size=BATCH_SIZE,
                    shuffle=False, validation_data=(trim_dataset(x_val_aapl, BATCH_SIZE),
                    trim_dataset(y_val_aapl, BATCH_SIZE)), callbacks=[csv_logger])
"""
#scores = lstm_mode_aapll_aapl.evaluate(x_val_aapl,y_val_aapl,verbose=0)
#print("%s: %.2f%%" % (lstm_mode_aapll_aapl.metrics_names[1],scores[1]*100))

model_json = lstm_mode_aapll_aapl.to_json()
with open('lstm_mode_aapll_aapl.json',"w") as json_file:
    json_file.write(model_json)
lstm_mode_aapll_aapl.save_weights("model_aapl.h5")
print("saved model to disk")"""